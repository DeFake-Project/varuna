import React from 'react';

type OptionItem = {
    id: string;
    name: string;
};

type OptionProps = {
    title: string;
    data: OptionItem[];
};

const Option: React.FC<OptionProps> = ({ title, data }) => {
    return (
        <>
            <h2>{title}</h2>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Option;