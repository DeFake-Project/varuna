import React from "react";
import { AnalyticType } from "@/lib/customTypes";

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
            className="py-1 px-2 m-1 rounded-[3px] bg-emerald-500 text-white leading-3"
        >
            <span className="text-xs">{value}</span>
        </li>
    ));
    const wheres = data.where.map((value: string, i: number) => (
        <li
            key={`data-${data.id}-where-${i}`}
            className="py-1 px-2 m-1 rounded-[3px] bg-amber-600 text-white leading-3"
        >
            <span className="text-xs">{value}</span>
        </li>
    ));
    const whats = data.what.map((value: string, i: number) => (
        <li
            key={`data-${data.id}-what-${i}`}
            className="py-1 px-2 m-1 rounded-[3px] bg-sky-500 text-white leading-3"
        >
            <span className="text-xs">{value}</span>
        </li>
    ));

    return (
        <div className="analytic-item-container bg-stone-900 rounded-lg shadow-md p-2 m-2">
            <div onClick={toggleCollapse}
                className="flex items-center justify-between text-white hover:bg-zinc-700 hover:cursor-pointer pr-2 rounded-sm">
                <h4>{data.name}</h4>
                <span className="text-zinc-600">{isCollapsed ? "▼" : "▲"}</span>
            </div>
            {!isCollapsed && (
                <>
                    <ul className="pt-2">
                        <li className="grid grid-flow-col-dense gap-2 justify-start">
                            <span>why</span>
                            <ul className="flex flex-wrap">
                                {whys}
                            </ul>
                        </li>
                        <li className="grid grid-flow-col-dense gap-2 justify-start">
                            <span>where</span>
                            <ul className="flex flex-wrap">
                                {wheres}
                            </ul>
                        </li>
                        <li className="grid grid-flow-col-dense gap-2 justify-start">
                            <span>what</span>
                            <ul className="flex flex-wrap">
                                {whats}
                            </ul>
                        </li>
                    </ul>
                    <div className="analytic-item-content">
                        <p className="text-gray-500">{data.description}</p>
                        <a
                            href={data.paperURL}
                            target="_blank"
                            className="bg-zinc-500 text-white hover:bg-zinc-800 rounded-md px-2 py-1 m-1"
                        >
                            Paper URL
                        </a>
                        <a
                            href={data.codeURL}
                            target="_blank"
                            className="bg-zinc-500 text-white hover:bg-zinc-800 rounded-md px-2 py-1 m-1"
                        >
                            Code URL
                        </a>
                        <button
                            className="bg-blue-500 text-white hover:bg-blue-800 rounded-md px-2 py-1 m-1">
                            Use Analytic
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AnalyticBlock;