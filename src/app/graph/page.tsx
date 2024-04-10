import React from 'react';
import Header from '../shared/header';
import type { Metadata } from "next";
import { DisplayGraph } from './graph';

export const metadata: Metadata = {
    title: "DiM-FOntology | Node Ontology",
    description: "A list of digital myltimedia forensics ontology for intelligence analysis and investigation",
};
export default function Page() {
    return <>
        <Header />
        <main className="analytics">
            <section className="instructions">
                <h2>Node Layout of the ontology</h2>
                <p></p>
            </section>
            {/* <DisplayGraph /> */}
        </main>
    </>;
}