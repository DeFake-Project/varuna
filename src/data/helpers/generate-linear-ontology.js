
import { generateLinearOntology } from '../../app/helpers/get-linear-ontology';
const fs = require('fs');

if (require.main === module) {
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