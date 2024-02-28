import React from 'react';
import Option from './option-block';

const OntologyContainer = ({ data }) => {
    const topLevel = data['start'].children;
    const topLevelKeys = Object.keys(topLevel);

    function objectToArray(obj) {
        return Object.keys(obj).map((key, index) => {
            return obj[key];
        });
    }

    return topLevelKeys.map((key, index) => {
        return (
            <Option key={index} title={key} data={objectToArray(topLevel[key].children)} />
        );
    });
};

export default OntologyContainer;
