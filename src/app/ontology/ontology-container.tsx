'use client'
import React from 'react';
import OptionBlock from './option-block';
import { OntologyEdge, OntologyNode } from '@/lib/customTypes';

const edges = require("@/data/edges.json");

const OntologyContainer = () => {
    const progressiveComponent = (blockName: string) => {
        const firstGenBlockEdges = edges.filter((edge: OntologyEdge) => edge.source === blockName);
        const firstGen: string[] = firstGenBlockEdges.map((edge: OntologyEdge) => edge.target);
        const firstBlock = firstGen.length > 0 ?
            <OptionBlock key={`${blockName}1-block`} title={blockName} nodenames={firstGen} />
            : null;

        const secondGenBlockEdges: OntologyEdge[] = edges.filter((edge: OntologyEdge) => firstGen.includes(edge.source));
        const secondGen: string[] = secondGenBlockEdges.map((edge: OntologyEdge) => edge.target);
        const secondBlock = secondGen.length > 0 ?
            <OptionBlock key={`${blockName}2-block`} title={blockName} nodenames={secondGen} />
            : null;

        const thirdGenBlockEdges: OntologyEdge[] = edges.filter((edge: OntologyEdge) => secondGen.includes(edge.source));
        const thirdGen: string[] = thirdGenBlockEdges.map((edge: OntologyEdge) => edge.target);
        const thirdBlock = thirdGen.length > 0 ?
            <OptionBlock key={`${blockName}3-block`} title={blockName} nodenames={thirdGen} />
            : null;
        return (
            <div className={`${blockName}-blocks-container grid grid-cols-3 grid-auto-rows`}>
                {firstBlock}
                {secondBlock}
                {thirdBlock}
            </div>
        )
    }

    return (
        <div className="ontology-container">
            {progressiveComponent("why")}
            {progressiveComponent("where")}
            {progressiveComponent("what")}
        </div>
    )
    // <OptionBlock key={`${block.id}-block`} title={block.name} data={childrenArray} />
};

export default OntologyContainer;
