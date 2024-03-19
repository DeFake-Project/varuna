import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import generateLinearOntology from '@/app/helpers/get-linear-ontology';
import processOntology from '@/app/helpers/get-ontology-tree';
import { OntologyFilter, OntologyEdge, OntologyState, OntologyNode, AnalyticType, AnalyticFilter } from '@/lib/customTypes';
import { SELECTED, AVAILABLE, EXISTS } from '@/lib/constants';

const nodes = require("@/data/nodes.json");
const edges = require("@/data/edges.json");
const analytics = require("@/data/analytics.json");

const initialState: OntologyState = {
    filter: {},
    tree: {},
    isLoading: false
};

const recursivelySetChildren = (filter: OntologyFilter, parentName: string) => {
    const children = edges.filter((edge: any) => edge.source === parentName);
    if (children.length == 0) return filter;

    let newFilter: OntologyFilter = filter;

    children.forEach((child: OntologyEdge) => {
        newFilter = recursivelySetChildren(newFilter, child.target);
        newFilter[child.target].state = AVAILABLE;
    });

    return newFilter;
}

const recursiveleSetParents = (filter: OntologyFilter, childName: string) => {
    const parents = edges.filter((edge: any) => edge.target === childName);
    if (parents.length == 0 || (parents.length == 1 && parents[0].source == "start")) return filter;

    let newFilter: OntologyFilter = filter;

    parents.forEach((parent: OntologyEdge) => {
        newFilter = recursiveleSetParents(newFilter, parent.source);
        if (newFilter[parent.source].level > 2) {
            newFilter[parent.source].state = SELECTED;
        }
    });

    return newFilter;
}

const recursivelyUnsetChildren = (filter: OntologyFilter, parentName: string) => {
    const children = edges.filter((edge: any) => edge.source === parentName);
    if (children.length == 0) return filter;

    let newFilter: OntologyFilter = filter;

    children.forEach((child: OntologyEdge) => {
        newFilter = recursivelyUnsetChildren(newFilter, child.target);
        newFilter[child.target].state = EXISTS;
    });

    return newFilter;
}

export const filteredAnalytics = (filter: OntologyFilter) => {
    const selectedWhy: string[] = Object.keys(filter).filter((key) => filter[key].state === "selected" && filter[key].group === 1);
    const selectedWhere: string[] = Object.keys(filter).filter((key) => filter[key].state === "selected" && filter[key].group === 2);
    const selectedWhat: string[] = Object.keys(filter).filter((key) => filter[key].state === "selected" && filter[key].group === 3);
    let analyticsList: AnalyticType[] = analytics;

    const alphabeticCompare = (a: AnalyticType, b: AnalyticType) => {
        return a.id.localeCompare(b.id);
    }

    if (selectedWhy.length > 0) {
        analyticsList = analyticsList
            .filter(
                (item: AnalyticType) => {
                    const whySubset = [...selectedWhy].filter((e: string) => item.why.includes(e));
                    // console.log(">> ", whySubset.length > 0 && whySubset.length >= selectedWhy.length, whySubset, selectedWhy, item.why)
                    return whySubset.length > 0 && whySubset.length >= selectedWhy.length;
                })
    } if (selectedWhere.length > 0) {
        analyticsList = analyticsList
            .filter(
                (item: AnalyticType) => {
                    const whereSubset = [...selectedWhere].filter((e: string) => item.where.includes(e));
                    // console.log(">> ", whereSubset.length > 0 && whereSubset.length >= selectedWhere.length, whereSubset, selectedWhere, item.where)
                    return whereSubset.length > 0 && whereSubset.length >= selectedWhere.length;
                }
            )
    } if (selectedWhat.length > 0) {
        analyticsList = analyticsList
            .filter(
                (item: AnalyticType) => {
                    const whatSubset = [...selectedWhat].filter((e: string) => item.what.includes(e));
                    // console.log(">> ", whatSubset.length > 0 && whatSubset.length >= selectedWhat.length, whatSubset, selectedWhat, item.what)
                    return whatSubset.length > 0 && whatSubset.length >= selectedWhat.length;
                }
            )
    }
    return {
        analytics: analyticsList.sort(alphabeticCompare),
        why: selectedWhy,
        where: selectedWhere,
        what: selectedWhat
    };
}

const _filterOptionSelected = (state: OntologyState, itemName: string) => {
    // set progeny to available
    const newFilter: OntologyFilter = state.filter;
    if (newFilter[itemName].state === SELECTED) {
        newFilter[itemName].state = EXISTS;
        state.filter = newFilter;
        state.filter = recursivelyUnsetChildren(newFilter, itemName);
        state.filter = _setAvilableFilter(state, filteredAnalytics(state.filter).analytics);
    } else {
        newFilter[itemName].state = SELECTED;
        state.filter = newFilter;
        state.filter = recursiveleSetParents(newFilter, itemName);
        state.filter = recursivelySetChildren(newFilter, itemName);
        state.filter = _setAvilableFilter(state, filteredAnalytics(state.filter).analytics);
    }

    console.log("++ Option selected:", itemName)
}

const _setAvilableFilter = (state: OntologyState, availableAnalytics: AnalyticType[]) => {
    const newFilter: OntologyFilter = state.filter;
    const availableWhy: string[] = availableAnalytics.map((item: AnalyticType) => item.why).flat();
    const availableWhere: string[] = availableAnalytics.map((item: AnalyticType) => item.where).flat();
    const availableWhat: string[] = availableAnalytics.map((item: AnalyticType) => item.what).flat();

    Object.keys(newFilter).forEach((key: string) => {
        if (newFilter[key].group === 1 && newFilter[key].state !== SELECTED) {
            newFilter[key].state = availableWhy.includes(key) ? AVAILABLE : EXISTS;
        } else if (newFilter[key].group === 2 && newFilter[key].state !== SELECTED) {
            newFilter[key].state = availableWhere.includes(key) ? AVAILABLE : EXISTS;
        } else if (newFilter[key].group === 3 && newFilter[key].state !== SELECTED) {
            newFilter[key].state = availableWhat.includes(key) ? AVAILABLE : EXISTS;
        }
    });

    return newFilter;
}

const _updateFilter = (state: any, action: PayloadAction<any>, actionType: string) => {
    switch (actionType) {
        case "activate":
            console.log("++ Set activated:", action)
            _filterOptionSelected(state, action.payload)
            break;
        case "available":
            console.log("++ Set available:", action)
        case "reset":
            console.log("++ Reset filter")
            break;
        default:
            break;
    }
}


export const ontologySlice = createSlice({
    name: "ontology",
    initialState,
    reducers: {
        initializeOntology: (state) => {
            state.filter = generateLinearOntology(nodes, edges);
            state.tree = processOntology(nodes, edges);
            state.isLoading = false;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        activateItem: {
            reducer(state, action: PayloadAction<any>) {
                _updateFilter(state, action, "activate");
            },
            prepare(payload: any) {
                return { payload };
            }
        }
    }
});

export const { setFilter, activateItem, initializeOntology } = ontologySlice.actions;
export default ontologySlice.reducer;