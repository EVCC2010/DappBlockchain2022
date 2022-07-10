pragma solidity ^0.4.17;

contract RepoFactory {
    address[] public deployedRepos;

    function createRepo(uint256 minimum) public {
        address newRepo = new Repo(minimum, msg.sender);
        deployedRepos.push(newRepo);
    }

    function getDeployedRepos() public view returns (address[]) {
        return deployedRepos;
    }
}

contract Repo {

    address public manager;
    uint256 public minimumContribution;

    function Repo(uint256 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

}
