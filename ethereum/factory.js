import web3 from './web3';
import CampaignFactory from './build/RepoFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x1B95eCF52eAf69E8aF9382030EB3a5c0C771093e'
);

export default instance;