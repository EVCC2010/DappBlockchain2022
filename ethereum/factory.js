import web3 from './web3';
import RepoFactory from './build/RepoFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(RepoFactory.interface),
    //'0x4635F563A6Ef3d05b5CeF7FB849573b0F3BE4271'
    //'0x74B896C32bA000A73eaa01F8CC8033980C571bfB'
    //'0xcb147Cb79FA2EC3105C56e59C0C1ac3F2A98D39c'
    //'0xc92f78d9f6Eef59e2099A28c367c7bf5ae97529e'
    //'0x2c6c92a5513ad4DB0ECddFa1F9F91872Bd81f922'
    '0xadE0F89908747f3AA4b5baD84Db2015a27E8a333'
);

export default instance;