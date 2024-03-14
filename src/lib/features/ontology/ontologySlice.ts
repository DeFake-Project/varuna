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
        newFilter[parent.source].state = SELECTED;
    });

    return newFilter;
}

export const filteredAnalytics = (filter: OntologyFilter) => {
    const selectedWhy: string[] = Object.keys(filter).filter((key) => filter[key].state === "selected" && filter[key].group === 1);
    const selectedWhere: string[] = Object.keys(filter).filter((key) => filter[key].state === "selected" && filter[key].group === 2);
    const selectedWhat: string[] = Object.keys(filter).filter((key) => filter[key].state === "selected" && filter[key].group === 3);
    let analyticsList: AnalyticType[] = analytics;

    console.log("++ Selected why:", selectedWhy, "Selected where:", selectedWhere, "Selected what:", selectedWhat)

    if (selectedWhy.length > 0) {
        analyticsList = analyticsList
            .filter(
                (item: AnalyticType) => [...selectedWhy].filter((e: string) => item.why.includes(e)).length > 0
            )
    } if (selectedWhere.length > 0) {
        analyticsList = analyticsList
            .filter(
                (item: AnalyticType) => [...selectedWhere].filter((e: string) => item.where.includes(e)).length > 0
            )
    } if (selectedWhat.length > 0) {
        analyticsList = analyticsList
            .filter(
                (item: AnalyticType) => [...selectedWhat].filter((e: string) => item.what.includes(e)).length > 0
            )
    }
    return analyticsList;
}

const _filterOptionSelected = (state: OntologyState, itemName: string) => {
    // set progeny to available
    const newFilter: OntologyFilter = state.filter;
    if (newFilter[itemName].state === SELECTED) {
        // newFilter[itemName].state = AVAILABLE;
        // state.filter = newFilter;
        // recursivelyUnsetChildren(newFilter, itemName);
    } else {
        newFilter[itemName].state = SELECTED;
        state.filter = newFilter;
        state.filter = recursiveleSetParents(newFilter, itemName);
        state.filter = recursivelySetChildren(newFilter, itemName);
        state.filter = _setAvilableFilter(state, filteredAnalytics(state.filter));
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