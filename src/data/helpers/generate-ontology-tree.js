import processOntology from '../../app/helpers/get-ontology-tree';

// Run the function from the terminal
if (require.main === module) {
    const fs = require('fs');
    const nodeFilePath = process.argv[2];
    const edgeFilePath = process.argv[3];
    const resultFileDirectory = process.argv[4];

    const nodeData = JSON.parse(fs.readFileSync(nodeFilePath, 'utf8'));
    const edgeData = JSON.parse(fs.readFileSync(edgeFilePath, 'utf8'));
    const ontology = processOntology(nodeFilePath, edgeFilePath);

    // export ontology as JSON file and save it
    const ontologyJSON = JSON.stringify(ontology, null, 2);
    const resultFilePath = `${resultFileDirectory}/ontology.json`;
    fs.writeFileSync(resultFilePath, ontologyJSON, 'utf8');

    console.log(ontology)
}
