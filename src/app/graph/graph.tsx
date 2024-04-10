'use client'
import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = { height: "500px", width: "500px" };

// Component that load the graph
export const LoadGraph = () => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
        const graph = new Graph();
        graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
        loadGraph(graph);
    }, [loadGraph]);

    return null;
};

// Component that display the graph
export const DisplayGraph = () => {
    return (
        <SigmaContainer style={sigmaStyle}>
            <LoadGraph />
        </SigmaContainer>
    );
};