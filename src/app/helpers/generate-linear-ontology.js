const fs = require('fs');

function generateLinearOntology(nodeFilePath, edgeFilePath, resultFileDirectory) {
    try {
        const nodeData = JSON.parse(fs.readFileSync(nodeFilePath, 'utf8'));
        const edgeData = JSON.parse(fs.readFileSync(edgeFilePath, 'utf8'));

        const ontology = {};

        // recursively traverse edges and add parents to each node
        function traverseEdges(node, edges) {
            const child = edges.find(edge => edge.source === node.id);
            if (!target) {
                return;
            }
            const parentObj = {
                ...nodeData.find(n => n.id === parent.source),
                parent: {}
            };
            parentObj.parent = traverseEdges(parentObj, edges);
            return parentObj;
        }

    } catch (error) {
        console.error('Error processing ontology:', error);
        return null;
    }
}

if (require.main === module) {
    const nodeFilePath = process.argv[2];
    const edgeFilePath = process.argv[3];
    const resultFileDirectory = process.argv[4];
    const ontology = generateLinearOntology(nodeFilePath, edgeFilePath, resultFileDirectory);
    console.log(ontology)
}

module.exports = generateLinearOntology;