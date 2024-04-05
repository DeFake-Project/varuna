import React from 'react';

export const CloseIcon = ({ width = 24, height = 24, color = '#000000' }) => (
    <svg width={width} height={height} viewBox="0 0 40 40">
        <path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" strokeWidth="4" />
    </svg>
);