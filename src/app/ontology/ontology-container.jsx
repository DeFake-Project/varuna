'use client'
import React from 'react';
import OptionBlock from './option-block';

const OntologyContainer = ({ data }) => {
    const whyBlock = data['start'].children['why'];
    const whereBlock = data['start'].children['where'];
    const whatBlock = data['start'].children['what'];

    function objectToArray(obj) {
        return Object.keys(obj).map((key, index) => {
            return obj[key];
        });
    }

    const RecursiveComponent = ({ data }) => {
        return (
            <div style={{ paddingLeft: "20px" }}>
                {data.map((parent) => {
                    return (
                        <div key={`${parent.id}-rec`}>
                            <span>{parent.id}</span>
                            {/* Base Condition and Rendering recursive component from inside itself */}
                            <div>
                                {parent.children && <RecursiveComponent data={objectToArray(parent.children)} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="ontology-container">
            <RecursiveComponent data={objectToArray(data['start'].children)} />
        </div>
    )
    // <OptionBlock key={`${block.id}-block`} title={block.name} data={childrenArray} />
};

export default OntologyContainer;
