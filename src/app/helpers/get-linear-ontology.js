
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
                const children = edges.filter(edge => edge.source === node.id);

                ontology[node.id] = {
                    id: node.id,
                    name: node.name,
                    state: 'available',
                    parents: parents.map(parent => parent.source),
                    children: children.map(child => child.target),
                };
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