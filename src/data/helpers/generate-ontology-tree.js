// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

import processOntology from '../../app/helpers/get-ontology-tree.js';
import fs from 'fs';

const nodeFilePath = process.argv[2];
const edgeFilePath = process.argv[3];
const resultFileDirectory = process.argv[4];

const nodeData = JSON.parse(fs.readFileSync(nodeFilePath, 'utf8'));
const edgeData = JSON.parse(fs.readFileSync(edgeFilePath, 'utf8'));
const ontology = processOntology(nodeData, edgeData);

// export ontology as JSON file and save it
const ontologyJSON = JSON.stringify(ontology, null, 2);
const resultFilePath = `${resultFileDirectory}/ontology.json`;
fs.writeFileSync(resultFilePath, ontologyJSON, 'utf8');

console.log(ontology)
