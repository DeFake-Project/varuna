import React from "react";
import { AnalyticType } from "@/lib/customTypes";

interface AnalyticBlockProps {
    data: AnalyticType
}

const AnalyticBlock = ({ data }: AnalyticBlockProps) => {
    const whys = data.why.map((value: string, i: number) => <li key={`data-${data.id}-why-${i}`}>{value}</li>)
    const wheres = data.why.map((value: string, i: number) => <li key={`data-${data.id}-where-${i}`}>{value}</li>)
    const whats = data.why.map((value: string, i: number) => <li key={`data-${data.id}-what-${i}`}>{value}</li>)
    return (
        <>
            <h4>{data.name}</h4>
            <ul>
                <li>
                    <span></span>
                </li>
            </ul>
        </>
    )
}