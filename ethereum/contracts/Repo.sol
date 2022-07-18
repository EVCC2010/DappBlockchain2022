// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";

contract RepoFactory {
    address[] public deployedRepos;

    function createRepo(uint256 minimum) public {
        address newRepo = new Repo(minimum, msg.sender);
        deployedRepos.push(newRepo);
    }

    function getDeployedRepos() public view returns (address[] memory) {
        return deployedRepos;
    }
}

contract Repo is NFTokenMetadata, Ownable {

    struct AudioFile{
        string description;
        uint256 value;
        string textTranscription;
        address tokenAddress;
    }

    AudioFile[] public audioFiles; //Array for audio files 

    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public contributor; //    address[] public contributor;
    uint256 public contributorsCount;

    constructor(uint256 minimum, address creator) payable {
        manager = creator;
        minimumContribution = minimum;
        nftName = "AudioFile";
        nftSymbol = "AFL";
    }

    function contribute() public payable {
    require(msg.value > minimumContribution);
    contributor[msg.sender] = true; // contributor.push(msg.sender);
    contributorsCount++;
    }

    function createAudioFile (
        string memory _description, 
        uint256 _value, 
        string memory _textTranscription, 
        address _tokenAddress) 
    public {
        AudioFile memory newAudioFile = AudioFile({
            description:_description,
            value:_value,
            textTranscription:_textTranscription,
            tokenAddress:_tokenAddress
        });
        audioFiles.push(newAudioFile);
    }

    function getSummary() public view returns (
        uint256,
        uint256,
        uint256,
        uint256,
        address){
        return (
            minimumContribution,
            address(this).balance,
            audioFiles.length,
            contributorsCount,
            manager
        );
    }

    function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
    super._mint(_to, _tokenId);
    super._setTokenUri(_tokenId, _uri);
  }
}
