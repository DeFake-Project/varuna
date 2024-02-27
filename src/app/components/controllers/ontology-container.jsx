import React from 'react';
import data from '../../../data/ontology.json';
import Option from '../shells/option-block';

const OntologyContainer = () => {

    const topLevel = data['start'].children;
    const topLevelKeys = Object.keys(topLevel)

    function objectToArray(obj) {
        return Object.keys(obj).map((key, index) => {
            return obj[key];
        });
    }
    return topLevelKeys.map((key, index) => {
        return (
            <Option key={index} title={key} data={objectToArray(topLevel[key].children)} />
        )
    });

};

export default OntologyContainer;
