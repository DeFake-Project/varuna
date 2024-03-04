'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { activateItem } from '@/lib/features/ontology/ontologySlice';
import { OntologyEdge, OntologyNode } from '@/lib/customTypes';

type OptionBlockProps = {
    title: string;
    nodenames: string[];
};

const OptionBlock: React.FC<OptionBlockProps> = ({ title, nodenames }) => {
    const dispatch = useAppDispatch();
    const filter: {
        [key: string]: {
            state: string;
            id: string;
            parents: string[];
        }
    } = useAppSelector((state) => state.ontology.filter);

    return (
        <div className={`${title} option-block p-4 `}>
            <h2 className="text-2xl font-bold">{title}</h2>
            <ul className="flex flex-col shrink">
                {nodenames.map((item: string) => {
                    // console.log(">> ", item)
                    return filter[item] ? (
                        <li key={`${filter[item].id}-option`} onClick={() => dispatch(activateItem(filter[item].id))} className={`${filter[item]?.state} ontology-item bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`}>
                            {filter[item].id}
                        </li>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default OptionBlock;