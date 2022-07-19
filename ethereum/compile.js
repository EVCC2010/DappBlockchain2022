const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const repoPath = path.resolve(__dirname, 'contracts', 'Repo.sol');
const source = fs.readFileSync(repoPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Repo.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

//console.log(input); //verify that input is built correctly

const output = JSON.parse(solc.compile(JSON.stringify(input)));

//console.log(output); //verify that module.exports is built correctly

const interface = output.contracts['Repo.sol'].Repo.abi;
const bytecode = output.contracts['Repo.sol'].Repo.evm.bytecode.object;

module.exports = {
    interface,
    bytecode
}

//module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Repo.sol'].Repo;

fs.ensureDirSync(buildPath);

for (let contract in output.contracts['Repo.sol']) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output.contracts['Repo.sol'][contract].abi
    );
}