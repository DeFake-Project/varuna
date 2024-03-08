import React from "react";

import { AnalyticType } from "@/lib/customTypes";
const analytics = require('@/data/analytics.json')

const analyticsBlocks = analytics.map(
    (item: AnalyticType, index: number) => <div key={`analytic-${index}`} className="analytic-item"></div>
)

const AnalyticsContainer = () => {
    return (
        <div className="analytics-container">
            <h2>List of available analytics</h2>

        </div>
    )
}

export default AnalyticsContainer;