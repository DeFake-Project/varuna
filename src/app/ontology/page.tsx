'use client'
import React from 'react';
import OntologyContainer from "./ontology-container";
import { useAppSelector } from '@/lib/hooks';
import AnalyticsContainer from '../analytics/analytics-container';
import Header from '../shared/header';

export default function Page() {
  const filter = useAppSelector(state => state.ontology.filter);
  return <>
    <Header />
    <main className="grid grid-cols-5 grid-auto-rows">
      <section className="instructions col-span-5">
        <h2>Use the interactable sentences provided to filter out the methods on the sidebar</h2>
        <p>all the fields have multi-select capability</p>
      </section>
      <section id="ontology" className="col-span-3">
        <OntologyContainer />
      </section>
      <aside className="col-span-2">
        <h2>Showing methods that</h2>
        <ul>
          <li>Detect instances of <span>Deepfakes for video reenactment</span></li>
          <li>Search within <span>Human content restricted to faces</span></li>
          <li>Analyze <span>spatial features</span> for <span>pixel inconsistency</span></li>
        </ul>
        <div>
          <AnalyticsContainer />
        </div>
      </aside>
    </main>
  </>;
}