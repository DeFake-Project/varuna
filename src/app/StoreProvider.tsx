'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { initializeOntology } from '../lib/features/ontology/ontologySlice'

// open json file and initialize the state
// const nodes = require("../../data/nodes.json");
// const edges = require("../../data/edges.json");

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
        storeRef.current.dispatch(initializeOntology())
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}