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
        <div className={`${title} option-block p-2 grid grid-flow-col auto-cols-max gap-2`}>
            <h2 className="text-1xl font-bold">{title}</h2>
            <ul className="flex option-list flex-col">
                {nodenames.map((item: string) => {
                    // console.log(">> ", item)
                    return filter[item] ? (
                        <li key={`${filter[item].id}-option`} onClick={() => dispatch(activateItem(filter[item].id))} className={`${filter[item]?.state} ontology-item`}>
                            {filter[item].id}
                        </li>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default OptionBlock;