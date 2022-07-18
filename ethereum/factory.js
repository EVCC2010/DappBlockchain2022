import web3 from './web3';
import RepoFactory from './build/RepoFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(RepoFactory.interface),
    //'0x4635F563A6Ef3d05b5CeF7FB849573b0F3BE4271'
    '0x74B896C32bA000A73eaa01F8CC8033980C571bfB'
);

export default instance;