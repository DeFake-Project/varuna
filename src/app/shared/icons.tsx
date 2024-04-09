import React from 'react';

export const CloseIcon = ({ width = 24, height = 24, color = '#000000' }) => (
    <svg width={width} height={height} viewBox="0 0 40 40">
        <path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" strokeWidth="4" />
    </svg>
);

export const ResetIcon = ({ width = 24, height = 24, color = '#000000' }) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
        <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fillRule="evenodd" />
    </svg>
);