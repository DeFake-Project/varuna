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

        return ontology;
    } catch (error) {
        console.error('Error processing ontology:', error);
        return {};
    }
}

// Run the function from the terminal
if (require.main === module) {
    const fs = require('fs');
    const nodeFilePath = process.argv[2];
    const edgeFilePath = process.argv[3];
    const resultFileDirectory = process.argv[4];

    const nodeData = JSON.parse(fs.readFileSync(nodeFilePath, 'utf8'));
    const edgeData = JSON.parse(fs.readFileSync(edgeFilePath, 'utf8'));
    const ontology = processOntology(nodeFilePath, edgeFilePath, resultFileDirectory);

    // export ontology as JSON file and save it
    const ontologyJSON = JSON.stringify(ontology, null, 2);
    const resultFilePath = `${resultFileDirectory}/ontology.json`;
    fs.writeFileSync(resultFilePath, ontologyJSON, 'utf8');

    console.log(ontology)
}

module.exports = processOntology;
