const { group } = require('console');
const fs = require('fs');

function processOntology(nodeFilePath, edgeFilePath) {
    try {
        const nodeData = JSON.parse(fs.readFileSync(nodeFilePath, 'utf8'));
        const edgeData = JSON.parse(fs.readFileSync(edgeFilePath, 'utf8'));

        const ontology = {};

        // Add nodes to the ontology dictionary
        nodeData.forEach(node => {
            if (node.group !== 0) {
                ontology[node.id] = {
                    id: node.id,
                    label: node.label,
                    group: node.group,
                    children: []
                };
            }
        });

        function addChildToOntology(ontology, childId, parentId) {
            const parent = ontology[parentId];
            const child = ontology[childId];

            if (parent && child) {
                parent.children.push(child);
                delete ontology[childId];

                // Recursively add the child to the parent's ancestors


            }
        }

        // Add edges to the ontology dictionary
        edgeData.forEach(edge => {
            addChildToOntology(ontology, edge.target, edge.source);
        });

        return ontology;
    } catch (error) {
        console.error('Error processing ontology:', error);
        return null;
    }
}

// Run the function from the terminal
if (require.main === module) {
    const nodeFilePath = process.argv[2];
    const edgeFilePath = process.argv[3];
    const ontology = processOntology(nodeFilePath, edgeFilePath);

    // Traverse ontology and print the results
    function printOntology(ontology, indent = 0) {
        Object.values(ontology).forEach(node => {
            console.log(' '.repeat(indent), node);
            printOntology(node.children, indent + 4);
        });
    }
    printOntology(ontology);
}

module.exports = processOntology;
