import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import generateLinearOntology from '../../../app/helpers/generate-linear-ontology';
import processOntology from '../../../app/helpers/process-ontology';

// const nodes = require("../../data/nodes.json");
// const edges = require("../../data/edges.json");
// const ontology = require("../../data/ontology.json");

export interface OntologyState {
    filter: Object;
    tree: Object;
}

// initialize the state from the json file
const initialState = {
    filter: {},
    tree: {}
};

const _updateFilter = (state: any, action: PayloadAction<any>) => {
    console.log(action.payload)
    state.filter = action.payload;
    const ontologyItems = Object.keys(state.filter);
}


export const ontologySlice = createSlice({
    name: "ontology",
    initialState,
    reducers: {
        initializeOntology: (state, action) => {
            state.filter = generateLinearOntology(action.payload.nodes, action.payload.edges);
            state.tree = processOntology(action.payload.nodes, action.payload.edges);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        updateFilter: {
            reducer(state, action: PayloadAction<any>) {
                _updateFilter(state, action);
            },
            prepare(payload: any) {
                return { payload };
            }
        }
    }
});

export const { setFilter, updateFilter, initializeOntology } = ontologySlice.actions;
export const selectFilter = (state: OntologyState) => state.filter;
export const selectTree = (state: OntologyState) => state.tree;
export default ontologySlice.reducer;
