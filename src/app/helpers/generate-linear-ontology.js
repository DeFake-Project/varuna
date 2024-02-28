const fs = require('fs');

function generateLinearOntology(nodeFilePath, edgeFilePath, resultFileDirectory) {
    try {
        const nodeData = JSON.parse(fs.readFileSync(nodeFilePath, 'utf8'));
        const edgeData = JSON.parse(fs.readFileSync(edgeFilePath, 'utf8'));

        const ontology = {};

        // recursively traverse edges and add parents to each node
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
                        ...node,
                        parents: parents[0].source,
                    };
                } else if (parents && parents.length > 1) {
                    // console.log('Multiple parents:', node.id, parents);
                    ontology[node.id] = {
                        ...node,
                        parents: parents.map(parent => parent.source),
                    };
                } else {
                    // console.log('No parents:', node.id, parents);
                    ontology[node.id] = {
                        ...node,
                        parents: [],
                    };
                }

            });
        }

        traverseEdges(edgeData, ["start"]);

        // export ontology as JSON file and save it
        const ontologyJSON = JSON.stringify(ontology, null, 2);
        const resultFilePath = `${resultFileDirectory}/ontology-linear.json`;
        fs.writeFileSync(resultFilePath, ontologyJSON, 'utf8');

        return ontology;

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