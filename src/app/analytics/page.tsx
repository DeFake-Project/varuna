// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

import React, { Suspense } from 'react';
import AnalyticsContainer from './analytics-container';
import Header from '../shared/header';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DiM-FOntology | Analytics List",
  description: "A list of digital myltimedia forensics analytics for intelligence analysis and investigation",
};

export default function Page() {
  return <>
    <Header />
    <main className="analytics">
      <section className="instructions">
        <h2>List of supported analytics</h2>
        <p>The search box performs a live search</p>
      </section>
      <Suspense>
        <AnalyticsContainer hasOntology={false} />
      </Suspense>
    </main>
  </>;
}