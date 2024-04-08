import React from 'react';
import OntologyContainer from "./ontology-container";
import AnalyticsContainer from '../analytics/analytics-container';
import Header from '../shared/header';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DiM-FOntology | Ontology",
  description: "A digital media forensics ontology for intellence analysis and investigation",
};

export default function Page() {
  return <>
    <Header />
    <main className="ontology">
      <section className="instructions">
        <h2>Use the interactable sentences provided to filter out the analyticss on the sidebar</h2>
        <p>all the fields have multi-select capability</p>
      </section>
      <OntologyContainer />
      <aside className="sidebar">
        <AnalyticsContainer hasOntology={true} />
      </aside>
    </main>
  </>;
}