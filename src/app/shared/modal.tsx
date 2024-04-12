"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnalyticType, OntologyFilter, StudyDataType } from "@/lib/customTypes";
import { useEffect, useState } from "react";
import { CloseIcon } from "./icons";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

const analytics = require("@/data/analytics.json");
const studyData: StudyDataType = require("@/data/study.json");

function Modal() {
    const [textarea, setTextarea] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const analytic = searchParams.get("analytic");
    const [accuracy, setAccuracy] = useState(0);
    const study = searchParams.get("study");
    const pathname = usePathname();
    const hasOntology = pathname !== "/analytics";
    const startTime = useAppSelector((state) => state.ontology.startTime);
    const filter: OntologyFilter = useAppSelector((state) => state.ontology.filter);
    const selectedFilter: string = Object.keys(filter).filter((key) => filter[key].state === "selected").join(" ");

    const analyticData: AnalyticType = analytics.find((item: AnalyticType) => item.id === analytic);

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextarea(event.target.value);
    };

    useEffect(() => {
        if (study && analytic) {
            if (studyData[study][analytic]?.type === "acc") {
                setAccuracy(Number(studyData[study][analytic].content[1]));
            } else {
                setAccuracy(Math.floor(Math.random() * 26) + 75);
            }
        }
    }, [study, analytic]);

    // close button action to go back in history
    const closeModal = () => {
        router.back();
    }

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

        let analyticResponse;
        let textToCopy = `<${analyticData.name}><${(Date.now() - startTime) / 1000}s> ${selectedFilter.length > 0 ? `<${selectedFilter}>` : ""} Report: ${textarea}`;

        if (study && analytic) {
            if (studyData[study][analytic]?.type === "img") {
                analyticResponse = (
                    <div className="analytic-item-response">
                        <Image width={600} height={600} src={studyData[study][analytic].content[1]} alt="analytic response" />
                    </div>
                )
            } else if (studyData[study][analytic]?.type === "metadata") {
                analyticResponse = (
                    <div className="analytic-item-response">
                        <ul className="metadata-list">
                            {studyData[study][analytic].content.map((item: string, i: number) => (
                                <li className="pill" key={`data-${analyticData.id}-response-${i}`}><strong>{item[0]}</strong> {item[1]}</li>
                            ))}
                        </ul>
                    </div>
                )
            } else if (studyData[study][analytic]?.type === "acc") {
                const accuracy = Number(studyData[study][analytic].content[1]);
                const accuracyClass = accuracy < 50 ? "real" : accuracy < 75 ? "sus" : "fake";
                textToCopy = `<${analyticData.name}>${accuracy && `<${accuracy}%>`}<${(Date.now() - startTime) / 1000}s> ${selectedFilter.length > 0 ? `<${selectedFilter}>` : ""} ${textarea.length > 0 ? `Report: ${textarea}` : ''}`;

                analyticResponse = (
                    <div className="analytic-item-response">
                        <div className="analytic-item-accuracy">
                            <span className={`pill ${accuracyClass}`}>{accuracy}%</span>
                            <span>
                                chance the content is manipulated
                            </span>
                        </div>
                    </div>
                )
            } else {
                const accuracy = Math.floor(Math.random() * 26) + 75
                const accuracyClass = accuracy < 50 ? "real" : accuracy < 75 ? "sus" : "fake";
                textToCopy = `<${analyticData.name}>${accuracy && `<${accuracy}%>`}<${(Date.now() - startTime) / 1000}s> ${textarea.length > 0 ? `Report: ${textarea}` : ''}`;

                analyticResponse = (
                    <div className="analytic-item-response">
                        <div className="analytic-item-accuracy">
                            <span className={`pill ${accuracyClass}`}>{accuracy}%</span>
                            <span>
                                chance the content is manipulated
                            </span>
                        </div>
                    </div>
                )
            }
        }




        content = (
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{analyticData.name}</h3>
                    <button title="close" type="button" className="button close-button" onClick={() => closeModal()}>
                        <CloseIcon width={20} height={20} color="red" />
                    </button>
                </div>
                {hasOntology && <ul className="analytic-item-ontology">
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
                {analyticResponse}
                {study && ["q1", "q2"].includes(study) ?
                    null : <div className="modal-input-area">
                        <label htmlFor="textarea">Write an excerpt for conveying these results in your report</label>
                        <textarea name="textarea" onChange={handleTextareaChange} id="textarea" cols={30} rows={3} value={textarea}></textarea>
                    </div>
                }
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