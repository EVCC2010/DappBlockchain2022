import web3 from './web3';
import Repo from './build/Repo.json';

export default address => {
    return new web3.eth.Contract(
        JSON.parse(Repo.interface),
        address
    );
}