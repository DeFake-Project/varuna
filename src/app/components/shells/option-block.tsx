import React from 'react';

type OptionItem = {
    id: number;
    name: string;
};

type OptionProps = {
    items: OptionItem[];
};

const Option: React.FC<OptionProps> = ({ items }) => {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
};

export default Option;