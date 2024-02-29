
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
        return ontology;
    } catch (error) {
        console.error('Error processing ontology:', error);
        return {};
    }
}

if (require.main === module) {
    const fs = require('fs');
    const nodeFilePath = process.argv[2];
    const edgeFilePath = process.argv[3];
    const resultFileDirectory = process.argv[4];

    const nodeData = JSON.parse(fs.readFileSync(nodeFilePath, 'utf8'));
    const edgeData = JSON.parse(fs.readFileSync(edgeFilePath, 'utf8'));
    const ontology = generateLinearOntology(nodeData, edgeData);

    // export ontology as JSON file and save it
    const ontologyJSON = JSON.stringify(ontology, null, 2);
    const resultFilePath = `${resultFileDirectory}/ontology-linear.json`;
    fs.writeFileSync(resultFilePath, ontologyJSON, 'utf8');

    console.log(ontology)
}

module.exports = generateLinearOntology;