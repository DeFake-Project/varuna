'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { activateItem } from '@/lib/features/ontology/ontologySlice';
import { OntologyFilter } from '@/lib/customTypes';
import * as Tooltip from '@radix-ui/react-tooltip';

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

    const nodeItem = (item: string) => (
        <Tooltip.Root key={`${filter[item].id}-option`}>
            <Tooltip.Trigger asChild>
                <li onClick={() => dispatch(activateItem(filter[item].id))} className={`${filter[item]?.state} ontology-item pill`}>
                    {filter[item].id}
                </li>
            </Tooltip.Trigger>
            <Tooltip.Content className="tooltip-content" sideOffset={2}>
                {filter[item].description}
                <Tooltip.Arrow />
            </Tooltip.Content>
        </Tooltip.Root>
    )

    const alphabeticCompare = (a: string, b: string, state: string) => {
        return filter[a].state === state && filter[b].state === state ? a.localeCompare(b) : 0;
    }

    nodenames.sort(sortByState).sort((a, b) => alphabeticCompare(a, b, "available"));

    return (
        <Tooltip.Provider>
            <div className={`${title} option-block scroll-shadows`}>
                <h2 className="">{title}</h2>
                <ul className="option-list">
                    {nodenames.map((item: string) => {
                        // console.log(">> ", item)
                        return filter[item] ? nodeItem(item) : null;
                    })}
                </ul>
                <div className="faded-scroller-bottom"></div>
            </div>
        </Tooltip.Provider>
    );
};

export default OptionBlock;