import React from 'react';
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
      <AnalyticsContainer hasOntology={false} />
    </main>
  </>;
}