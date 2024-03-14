'use client'
import React from "react";
import AnalyticBlock from "@/app/analytics/analytic-block";
import { OntologyFilter } from '@/lib/customTypes';
import { useAppSelector } from '@/lib/hooks';


import { AnalyticType } from "@/lib/customTypes";
import { filteredAnalytics } from "@/lib/features/ontology/ontologySlice";

const AnalyticsContainer = () => {
    const filter: OntologyFilter = useAppSelector((state) => state.ontology.filter);
    const analyticsList: AnalyticType[] = filteredAnalytics(filter);

    const analyticsBlocks = analyticsList.map(
        (item: AnalyticType, index: number) => <AnalyticBlock key={`analytic-${index}`} data={item} />
    )

    return (
        <div className="analytics-container h-screen max-h-screen overflow-y-auto">
            <h2 className="mb-4">List of available analytics</h2>
            {analyticsBlocks}
        </div>
    )
}

export default AnalyticsContainer;