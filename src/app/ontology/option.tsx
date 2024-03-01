'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { activateItem } from '@/lib/features/ontology/ontologySlice';

type OptionItem = {
    id: string;
    name: string;
    state: string;
    parents: string[];
};

type OptionProps = {
    item: OptionItem;
    children: React.ReactNode;
};

const Option: React.FC<OptionProps> = ({ children, item }) => {
    const dispatch = useAppDispatch();
    const filter: { [key: string]: { state: string } } = useAppSelector((state) => state.ontology.filter);
    return (
        <li key={item.id} onClick={() => dispatch(activateItem(item.id))} className={`${filter[item.id]?.state} ontology-item bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`}>
            {children}
        </li>
    );
};

export default Option;