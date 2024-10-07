// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

import React, { Suspense } from 'react';
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
    <Suspense>
      <main className="ontology">
        <section className="instructions">
          <h2>Use the interactable sentences provided to filter out the analytics on the sidebar</h2>
          <p>all the fields have multi-select capability</p>
        </section>
        <OntologyContainer />
        <aside className="sidebar">
          <AnalyticsContainer hasOntology={true} />
        </aside>
      </main>
    </Suspense>
  </>;
}