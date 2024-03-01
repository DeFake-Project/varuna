import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import generateLinearOntology from '../../../app/helpers/get-linear-ontology';
import processOntology from '../../../app/helpers/get-ontology-tree';

const nodes = require("../../../data/nodes.json");
const edges = require("../../../data/edges.json");

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

    console.log("++ Update Filter Action:", action)
    // const ontologyItems = Object.keys(state.filter);

    // switch (action.payload.type) {
    //     case value:

    //         break;

    //     default:
    //         break;
    // }
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
