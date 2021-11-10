// Generates deployment related files for given network
// Specify networks in ../deployments.json
// Usage: yarn run ts-node scripts/generate-deployment.ts <NETWORK_NAME>

const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const deployments = require('./contracts');

const deploymentName = process.argv[2];
if (!deploymentName) throw new Error('no deployment name provided');

// eslint-disable-next-line
const deploymentData = (deployments)[deploymentName];
console.log({deploymentData})
if (!deploymentData) throw new Error(`deployment ${deploymentName} not found`);

console.log(`Generating deployment files for ${deploymentName}...`);

const generatedDir = path.join(process.cwd(), 'generated');
const templatesDir = path.join(process.cwd(), 'templates');

function replace(templateFile, outputFile) {
  console.log(`Writing template ${templateFile} to ${outputFile}`);
  const template = fs.readFileSync(templateFile);
  const compile = handlebars.compile(template.toString());
  const replaced = compile(deploymentData);
  fs.writeFileSync(outputFile, replaced);
}

if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir);
}
npm i 
// addresses.ts
let input = path.join(templatesDir, 'addresses.ts');
let output = path.join(generatedDir, 'addresses.ts');
replace(input, output);

// subgraph.yaml
input = path.join(templatesDir, 'subgraph.yaml');
output = path.join(process.cwd(), 'subgraph.yaml');
replace(input, output);
