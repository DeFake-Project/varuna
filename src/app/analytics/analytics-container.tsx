'use client'
import React from "react";
import AnalyticBlock from "@/app/analytics/analytic-block";
import { OntologyFilter } from '@/lib/customTypes';
import { useAppSelector } from '@/lib/hooks';


import { AnalyticType } from "@/lib/customTypes";
import { filteredAnalytics } from "@/lib/features/ontology/ontologySlice";

const AnalyticsContainer = () => {
    const filter: OntologyFilter = useAppSelector((state) => state.ontology.filter);
    const analyticsList: {
        analytics: AnalyticType[],
        why: string[],
        where: string[],
        what: string[]
    } = filteredAnalytics(filter);
    // console.log(">> ", analyticsList)

    const analyticsBlocks = analyticsList.analytics.length > 0
        ? analyticsList.analytics.map(
            (item: AnalyticType, index: number) => <AnalyticBlock key={`analytic-${index}`} data={item} />
        )
        : <p>No analytics available for the current selection</p>;

    return (
        <div className="analytics-sidebar">
            <div className="analytics-header">
                <h2>Showing methods that</h2>
                <ul>
                    <li>Detect instances of <span className="why">{analyticsList.why.length > 0 ? analyticsList.why.join(", ") : "anything"}</span></li>
                    <li>Search within <span className="where">{analyticsList.where.length > 0 ? analyticsList.where.join(", ") : "everywhere"}</span></li>
                    <li>Analyze <span className="what">{analyticsList.what.length > 0 ? analyticsList.what.join(", ") : "everything"}</span></li>
                </ul>
            </div>
            <div className="analytics-container">
                <h2>List of available analytics</h2>
                {analyticsBlocks}
            </div>
        </div>
    )
}

export default AnalyticsContainer;