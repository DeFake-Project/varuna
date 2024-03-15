'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { activateItem } from '@/lib/features/ontology/ontologySlice';
import { OntologyFilter } from '@/lib/customTypes';

type OptionBlockProps = {
    title: string;
    nodenames: string[];
};

const OptionBlock: React.FC<OptionBlockProps> = ({ title, nodenames }) => {
    const dispatch = useAppDispatch();
    const filter: OntologyFilter = useAppSelector((state) => state.ontology.filter);

    return (
        <div className={`${title} option-block scroll-shadows`}>
            <h2 className="">{title}</h2>
            <ul className="option-list">
                {nodenames.map((item: string) => {
                    // console.log(">> ", item)
                    return filter[item] ? (
                        <li key={`${filter[item].id}-option`} onClick={() => dispatch(activateItem(filter[item].id))} className={`${filter[item]?.state} ontology-item pill`}>
                            {filter[item].id}
                        </li>
                    ) : null;
                })}
            </ul>
            <div className="faded-scroller-bottom"></div>
        </div>
    );
};

export default OptionBlock;