// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { activateItem } from '@/lib/features/ontology/ontologySlice';
import { OntologyFilter } from '@/lib/customTypes';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useSearchParams } from 'next/navigation';

type OptionBlockProps = {
    title: string;
    nodenames: string[];
};

const OptionBlock: React.FC<OptionBlockProps> = ({ title, nodenames }) => {
    const dispatch = useAppDispatch();
    const filter: OntologyFilter = useAppSelector((state) => state.ontology.filter);
    const searchParams = useSearchParams();
    const tooltip = searchParams.get("tooltip");

    // sort by state
    const sortByState = (a: string, b: string) => {
        if (filter[a].state === "selected") return -1;
        if (filter[b].state === "selected") return 1;
        if (filter[a].state === "available") return -1;
        if (filter[b].state === "available") return 1;
        return 0;
    }

    const nodeItem = (item: string) => tooltip == "on" ? (
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
    ) : (
        <li key={`${filter[item].id}-option`} onClick={() => dispatch(activateItem(filter[item].id))} className={`${filter[item]?.state} ontology-item pill`}>
            {filter[item].id}
        </li>
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