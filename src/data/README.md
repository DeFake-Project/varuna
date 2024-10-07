# Ontology Guide
This guide outlines the structure and components of our ontology, which consists of nodes and edges. Nodes represent existing concepts used within the ontology, while edges define the relations between these nodes.  

The ontology is organized into three major components:  

Capability Space: **Why** are you analyzing the media? This component includes the motivations/hypothesis behind the analysis.  
Search Space: **Where** do you want the analytic to look ? This component includes the regions of interest (ROIs) you may want the analytic to focus on. It is also a simpler way to understand possible limitations of an analytic.  
Feature Space: **What** features do you want to use for the analysis? This component includes the features you may want the analytic to use and is geared towards more expert users.  

## Ontology nodes
All nodes, along with their definitions and corresponding spaces, can be found in the `nodes.json` file. Nodes are essential concepts in the ontology that help organize analytics. By tagging each analytic with the appropriate concepts in Why, Where, and What, users can efficiently retrieve analytics based on these concepts.

**id**: A unique identifier for each node.  
**name**: The full name of the node.  
**group**: The space each node belongs to. 1 represents the capability space (Why), 2 represents the search space (Where), and 3 represents the feature space (What).  
**description**: A definition that explains the node.  

We welcome suggestions for adding new nodes, refining existing descriptions, or any other improvements to the ontology's development. Please submit a pull request detailing your suggestions, and our team will review it.

## Ontology edges
To establish a comprehensive structure, the ontology specifies the relations among nodes. The `edges.json` file details these relations and includes five properties:

**source**: The starting node of the edge.  
**target**: The ending node of the edge.  
**label**: The relation between the source and target.   
**weight**: A numeric value representing the strength of the relation.   
**type**: A descriptor for the nature of the relationship.   

## Generate your own ontology locally
*To be added later* 
