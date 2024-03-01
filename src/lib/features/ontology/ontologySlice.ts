import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import generateLinearOntology from '@/app/helpers/get-linear-ontology';
import processOntology from '@/app/helpers/get-ontology-tree';

const nodes = require("@/data/nodes.json");
const edges = require("@/data/edges.json");

export interface OntologyState {
    filter: Object;
    tree: Object;
}

// initialize the state from the json file
const initialState = {
    filter: {},
    tree: {}
};

const _updateFilter = (state: any, action: PayloadAction<any>, actionType: string) => {
    switch (actionType) {
        case "activate":
            console.log("++ Set activated:", action)
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
export const selectFilter = (state: OntologyState) => state.filter;
export const selectTree = (state: OntologyState) => state.tree;
export default ontologySlice.reducer;
