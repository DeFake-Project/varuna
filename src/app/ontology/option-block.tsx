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

    // sort by state
    const sortByState = (a: string, b: string) => {
        if (filter[a].state === "selected") return -1;
        if (filter[b].state === "selected") return 1;
        if (filter[a].state === "available") return -1;
        if (filter[b].state === "available") return 1;
        return 0;
    }
    nodenames.sort(sortByState);

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