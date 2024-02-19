import React from 'react';
import data from '../../../data/ontology.json';
import Option from '../shells/option-block';

const OntologyContainer = () => {
    return (
        <div id="why-block" className="flex">
            <Option key="ontology-group" item={data} />
        </div>
    );
};

export default OntologyContainer;
