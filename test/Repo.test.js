const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/RepoFactory.json');
const compiledRepo = require('../ethereum/build/Repo.json');

let accounts;
let factory;
let RepoAddress;
let Repo;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createRepo('100').send({
        from: accounts[0],
        gas: '1000000',
    });

    [RepoAddress] = await factory.methods.getDeployedRepos().call();
    Repo = await new web3.eth.Contract(
        JSON.parse(compiledRepo.interface), 
        RepoAddress);
});

describe('Repos', () => {
    it('deploys a factory and a Repo', () => {
        assert.ok(factory.options.address);
        assert.ok(Repo.options.address);
    });

    it('marks caller as rhe Repo manager', async () => {
        const manager = await Repo.methods.manager().call();
        assert.equal(accounts[0], manager);
    });
});
