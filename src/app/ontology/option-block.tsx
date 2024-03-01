'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { activateItem } from '@/lib/features/ontology/ontologySlice';

type OptionBlockItem = {
    id: string;
    name: string;
    state: string;
    parents: string[];
};

type OptionBlockProps = {
    title: string;
    data: OptionBlockItem[];
};

const OptionBlock: React.FC<OptionBlockProps> = ({ title, data }) => {
    const dispatch = useAppDispatch();
    const filter: { [key: string]: { state: string } } = useAppSelector((state) => state.ontology.filter);

    return (
        <div className={`${title} option-block p-4`}>
            <h2 className="text-2xl font-bold">{title}</h2>
            <ul className="flex flex-col shrink">
                {data.map((item) => (
                    <li key={item.id} onClick={() => dispatch(activateItem(item.id))} className={`${filter[item.id]?.state} ontology-item bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OptionBlock;