'use client'
import React from "react";
import AnalyticBlock from "@/app/analytics/analytic-block";
import { OntologyFilter } from '@/lib/customTypes';
import { useAppSelector } from '@/lib/hooks';


import { AnalyticType } from "@/lib/customTypes";
import { filteredAnalytics } from "@/lib/features/ontology/ontologySlice";

const AnalyticsContainer = ({ hasOntology }: { hasOntology: boolean }) => {
    const [searchString, setSearchString] = React.useState("");

    const filter: OntologyFilter = useAppSelector((state) => state.ontology.filter);
    let analyticsList: {
        analytics: AnalyticType[],
        why: string[],
        where: string[],
        what: string[],
    } = {
        analytics: [],
        why: [],
        where: [],
        what: []
    }
    if (hasOntology) {
        analyticsList = filteredAnalytics(filter);
    } else {
        analyticsList = filteredAnalytics({}, searchString)
    }
    // console.log(">> ", analyticsList)

    const analyticsBlocks = analyticsList.analytics.length > 0
        ? analyticsList.analytics.map(
            (item: AnalyticType, index: number) => <AnalyticBlock key={`analytic-${index}`} data={item} hasOntology={hasOntology} />
        )
        : <p>No analytics available for the current selection</p>;

    const analyticsHeader = hasOntology ? <div className="analytics-header">
        <h2>Showing methods that</h2>
        <ul>
            <li>Detect instances of <span className="why">{analyticsList.why.length > 0 ? analyticsList.why.join(", ") : "anything"}</span></li>
            <li>Search within <span className="where">{analyticsList.where.length > 0 ? analyticsList.where.join(", ") : "everywhere"}</span></li>
            <li>Analyze <span className="what">{analyticsList.what.length > 0 ? analyticsList.what.join(", ") : "everything"}</span></li>
        </ul>
    </div>
        : <div className="analytics-header search">
            <input type="text" name="search" id="search" title="search" placeholder="Search for a method" onChange={(e) => setSearchString(e.target.value)} value={searchString} />
        </div>;


    return (
        <div className="analytics-sidebar">
            {analyticsHeader}
            <div className="analytics-container">
                <h2>List of available analytics</h2>
                {analyticsBlocks}
            </div>
        </div>
    )
}

export default AnalyticsContainer;