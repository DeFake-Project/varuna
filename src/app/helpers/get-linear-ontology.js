
function generateLinearOntology(nodeData, edgeData) {
    try {
        const ontology = {};

        // traverse edges and add parents to each node
        function traverseEdges(edges, ignoreNodes = ["start"]) {
            nodeData.forEach(node => {
                if (ignoreNodes.includes(node.id)) {
                    return;
                }
                const parents = edges.filter(edge => edge.target === node.id);
                // if parents is an array, it means the node has multiple parents
                if (parents && parents.length === 1) {
                    // console.log('Single parent:', node.id, parents);
                    ontology[node.id] = {
                        id: node.id,
                        state: 'available',
                        parents: parents[0].source,
                    };
                } else if (parents && parents.length > 1) {
                    // console.log('Multiple parents:', node.id, parents);
                    ontology[node.id] = {
                        id: node.id,
                        state: 'available',
                        parents: parents.map(parent => parent.source),
                    };
                } else {
                    // console.log('No parents:', node.id, parents);
                    ontology[node.id] = {
                        id: node.id,
                        state: 'available',
                        parents: [],
                    };
                }
            });
        }
        traverseEdges(edgeData, ["start"]);

        console.log("++ Generated linear ontology");
        // console.log('Ontology:', ontology);
        return ontology;
    } catch (error) {
        console.error('Error processing ontology:', error);
        return {};
    }
}

module.exports = generateLinearOntology;