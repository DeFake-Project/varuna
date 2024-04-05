import React from "react";
import { AnalyticType } from "@/lib/customTypes";
import Link from "next/link";

interface AnalyticBlockProps {
    data: AnalyticType
}

const AnalyticBlock = ({ data }: AnalyticBlockProps) => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const whys = data.why.map((value: string, i: number) => (
        <li
            key={`data-${data.id}-why-${i}`}
            className="pill why"
        >
            <span className="text-xs">{value}</span>
        </li>
    ));
    const wheres = data.where.map((value: string, i: number) => (
        <li
            key={`data-${data.id}-where-${i}`}
            className="pill where"
        >
            <span className="text-xs">{value}</span>
        </li>
    ));
    const whats = data.what.map((value: string, i: number) => (
        <li
            key={`data-${data.id}-what-${i}`}
            className="pill what"
        >
            <span className="text-xs">{value}</span>
        </li>
    ));

    return (
        <div className="analytic-item-container">
            <div onClick={toggleCollapse}
                className="analytic-item-header">
                <h4>{data.name}</h4>
                <span className={`caret ${isCollapsed ? "" : "open"}`}>▼</span>
            </div>
            {!isCollapsed && (
                <div className="analytic-item-content">
                    <ul className="analytic-item-ontology">
                        <li className="analytic-item-ontology-content">
                            <span>why</span>
                            <ul className="analytic-item-ontology-list">
                                {whys}
                            </ul>
                        </li>
                        <li className="analytic-item-ontology-content">
                            <span>where</span>
                            <ul className="analytic-item-ontology-list">
                                {wheres}
                            </ul>
                        </li>
                        <li className="analytic-item-ontology-content">
                            <span>what</span>
                            <ul className="analytic-item-ontology-list">
                                {whats}
                            </ul>
                        </li>
                    </ul>
                    <div className="analytic-item-description">
                        <p>{data.description}</p>
                    </div>
                    <div className="analytic-item-footer">
                        <a
                            href={data.paperURL}
                            target="_blank"
                            className="button button-small button-secondary"
                        >
                            Paper URL
                        </a>
                        <a
                            href={data.codeURL}
                            target="_blank"
                            className="button button-small button-secondary"
                        >
                            Code URL
                        </a>
                        <Link href={`?modal=true&analytic=${data.id}`}>
                            <button type="button" className="button">Use Analytic</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticBlock;