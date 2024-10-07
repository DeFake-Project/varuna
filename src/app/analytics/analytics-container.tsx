// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

'use client'
import React from "react";
import AnalyticBlock from "@/app/analytics/analytic-block";
import { OntologyFilter } from '@/lib/customTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';


import { AnalyticType } from "@/lib/customTypes";
import { filteredAnalytics, initializeOntology } from "@/lib/features/ontology/ontologySlice";
import { useSearchParams } from "next/navigation";
import { ResetIcon } from "../shared/icons";

const AnalyticsContainer = ({ hasOntology }: { hasOntology: boolean }) => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const studyCode = searchParams.get("study");

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
            (item: AnalyticType, index: number) => <AnalyticBlock key={`analytic-${index}`} data={item} hasOntology={hasOntology} studyCode={studyCode} />
        )
        : <p>No analytics available for the current selection</p>;

    const analyticsHeader = hasOntology ? <div className="analytics-header">
        <div>
            <h2>Showing analytics that</h2>
            <button type="button" className="button button-small" onClick={() => dispatch(initializeOntology())}>
                <ResetIcon height={14} width={14} color="#fff" /> reset
            </button>
        </div>
        <ul>
            <li>Detect instances of <span className="why">{analyticsList.why.length > 0 ? analyticsList.why.join(", ") : "anything"}</span></li>
            <li>Search within <span className="where">{analyticsList.where.length > 0 ? analyticsList.where.join(", ") : "everywhere"}</span></li>
            <li>Analyze <span className="what">{analyticsList.what.length > 0 ? analyticsList.what.join(", ") : "everything"}</span></li>
        </ul>
    </div>
        : <div className="analytics-header search">
            <input type="text" name="search" id="search" title="search" placeholder="Search for a analytics" onChange={(e) => setSearchString(e.target.value)} value={searchString} />
        </div>;


    return (
        <div className="analytics-sidebar">
            {analyticsHeader}
            <div className="analytics-container">
                <h2>List of {analyticsList.analytics.length} available analytics</h2>
                {analyticsBlocks}
            </div>
        </div>
    )
}

export default AnalyticsContainer;