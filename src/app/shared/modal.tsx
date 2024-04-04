"use client"
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { AnalyticType } from "@/lib/customTypes";
import { useState } from "react";
import { text } from "stream/consumers";

const analytics = require("@/data/analytics.json");

function Modal() {
    const [textarea, setTextarea] = useState("");

    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const analytic = searchParams.get("analytic");
    const accuracy = searchParams.get("acc");
    const pathname = usePathname();

    const analyticData: AnalyticType = analytics.find((item: AnalyticType) => item.id === analytic);

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextarea(event.target.value);
    };

    let content = null;
    if (analyticData) {

        const whys = analyticData.why.map((value: string, i: number) => (
            <li
                key={`data-${analyticData.id}-why-${i}`}
                className="pill why"
            >
                <span>{value}</span>
            </li>
        ));
        const wheres = analyticData.where.map((value: string, i: number) => (
            <li
                key={`data-${analyticData.id}-where-${i}`}
                className="pill where"
            >
                <span>{value}</span>
            </li>
        ));
        const whats = analyticData.what.map((value: string, i: number) => (
            <li
                key={`data-${analyticData.id}-what-${i}`}
                className="pill what"
            >
                <span>{value}</span>
            </li>
        ));

        const textToCopy = `<${analyticData.name}><${accuracy}%> Report: ${textarea}`;

        content = (
            <div className="modal-content">
                <h3>{analyticData.name}</h3>
                {<ul className="analytic-item-ontology">
                    {whys && <li className="analytic-item-ontology-content">
                        <span>why</span>
                        <ul className="analytic-item-ontology-list">
                            {whys}
                        </ul>
                    </li>}
                    {wheres && <li className="analytic-item-ontology-content">
                        <span>where</span>
                        <ul className="analytic-item-ontology-list">
                            {wheres}
                        </ul>
                    </li>}
                    {whats && <li className="analytic-item-ontology-content">
                        <span>what</span>
                        <ul className="analytic-item-ontology-list">
                            {whats}
                        </ul>
                    </li>}
                </ul>}
                {analyticData && <div className="analytic-item-description">
                    <p>{analyticData.description}</p>
                </div>}
                {accuracy && <div className="analytic-item-accuracy">
                    <p>Accuracy: {accuracy}%</p>
                </div>}
                <div className="modal-input-area">
                    <label htmlFor="textarea">Write an excerpt for conveying these results in your report</label>
                    <textarea name="textarea" onChange={handleTextareaChange} id="textarea" cols={30} rows={3}>{textarea}</textarea>
                </div>
                {/* <Link href={pathname}>
                    <button type="button" className="button">Close Modal</button>
                </Link> */}
                <button className="button" onClick={() => { navigator.clipboard.writeText(textToCopy) }}>Copy Content</button>
            </div>
        )

    } else {
        content = (
            <div>
                <p>Sorry, we couldn&apos;t find the analytic you were looking for</p>
                <Link href={pathname}>
                    <button type="button" className="button">Close Modal</button>
                </Link>
            </div>
        )
    }

    return (
        <>
            {modal && <dialog
                className="modal">
                <div>
                    {content}
                </div>
            </dialog>}
        </>
    );
}

export default Modal;