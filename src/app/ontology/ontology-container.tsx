'use client'
import React from 'react';
import OptionBlock from './option-block';
import { OntologyEdge } from '@/lib/customTypes';

const edges = require("@/data/edges.json");

const OntologyContainer = () => {
    const progressiveComponent = (blockName: string, supportingText: {
        prefix: string[],
        suffix: string[]
    }) => {
        const firstGenBlockEdges = edges.filter((edge: OntologyEdge) => edge.source === blockName);
        const firstGen: string[] = firstGenBlockEdges.map((edge: OntologyEdge) => edge.target);
        const firstBlock = firstGen.length > 0 ?
            <OptionBlock key={`${blockName}1-block`} title={
                supportingText.prefix[0]
                    ? supportingText.prefix[0]
                    : blockName
            } nodenames={firstGen} />
            : null;

        const secondGenBlockEdges: OntologyEdge[] = edges.filter((edge: OntologyEdge) => firstGen.includes(edge.source));
        const secondGen: string[] = secondGenBlockEdges.map((edge: OntologyEdge) => edge.target);
        const secondBlock = secondGen.length > 0 ?
            <OptionBlock key={`${blockName}2-block`} title={
                supportingText.prefix[1]
                    ? supportingText.prefix[1]
                    : blockName
            } nodenames={secondGen} />
            : null;

        const thirdGenBlockEdges: OntologyEdge[] = edges.filter((edge: OntologyEdge) => secondGen.includes(edge.source));
        const thirdGen: string[] = thirdGenBlockEdges.map((edge: OntologyEdge) => edge.target);
        const thirdBlock = thirdGen.length > 0 ?
            <OptionBlock key={`${blockName}3-block`} title={
                supportingText.prefix[2]
                    ? supportingText.prefix[2]
                    : blockName
            } nodenames={thirdGen} />
            : null;
        return (
            <div className={`${blockName}-blocks-container option-block-group`}>
                {firstBlock}
                {secondBlock}
                {thirdBlock}
            </div>
        )
    }

    return (
        <section className="ontology-container">
            {progressiveComponent("why", {
                prefix: ["I think my content is a", "in the form of", "in the"],
                suffix: ["", "", "category"]
            })}
            {progressiveComponent("what", {
                prefix: ["I want to analyze", "content in the form of"],
                suffix: ["", "inconsistencies"]
            })}
            {progressiveComponent("where", {
                prefix: ["I want to search within", " ", " "],
                suffix: [" ", " ", " "]
            })}
        </section>
    )
    // <OptionBlock key={`${block.id}-block`} title={block.name} data={childrenArray} />
};

export default OntologyContainer;
