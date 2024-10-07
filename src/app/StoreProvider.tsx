// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

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