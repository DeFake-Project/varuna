function processOntology(nodeData, edgeData) {
    try {
        const ontology = {};

        // recursively traverse edges and add children to each node
        function traverseEdges(node, edges) {
            const children = edges.filter(edge => edge.source === node.id);
            if (children.length === 0) {
                return;
            }
            var childrenObj = {};
            children.forEach(child => {
                childrenObj[child.target] = {
                    ...nodeData.find(n => n.id === child.target),
                    children: {}
                };
                childrenObj[child.target].children = traverseEdges(childrenObj[child.target], edges);
            });
            return childrenObj;
        }

        ontology[nodeData[0].id] = {
            ...nodeData[0],
            children: traverseEdges(nodeData[0], edgeData)
        };

        console.log("++ Generated ontology tree");
        // console.log('Ontology:', ontology);
        return ontology;
    } catch (error) {
        console.error('Error processing ontology:', error);
        return {};
    }
}

export default processOntology;
