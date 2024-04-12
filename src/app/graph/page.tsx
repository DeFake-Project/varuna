import React from 'react';
import Header from '../shared/header';
import type { Metadata } from "next";
// import { DisplayGraph } from './graph';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
    title: "DiM-FOntology | Node Ontology",
    description: "A list of digital myltimedia forensics ontology for intelligence analysis and investigation",
};
export default function Page() {

    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
        const SigmaContainer = dynamic(
            import("@react-sigma/core").then((mod) => mod.SigmaContainer), { ssr: false }
        );
        const OntologyGraph = dynamic(
            import("./graph").then((mod) => mod.DisplayGraph), { ssr: false }
        );
        return <>
            <Header />
            <main className="analytics">
                <section className="instructions">
                    <h2>Node Layout of the ontology</h2>
                    <p></p>
                </section>
                <SigmaContainer style={{ height: "500px", width: "500px" }}>
                    <OntologyGraph />
                </SigmaContainer>
            </main>
        </>;
    } else {
        return <>
            <Header />
            <main className="analytics">
                <section className="instructions">
                    <h2>Node Layout of the ontology unavialable</h2>
                </section>
            </main>
        </>
    }
}