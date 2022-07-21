// SPDX-License-Identifier: MIT
 
pragma solidity ^0.4.17;
 
contract RepoFactory {
   Repo[] public deployedRepos;
 
   function createRepo(uint256 minimum) public  {
       Repo repo = new Repo(minimum, msg.sender);
       deployedRepos.push(repo);
   }
 
   function getDeployedRepos() public view returns (Repo[] memory) {
      return deployedRepos;
   }
}
 
contract Repo {
 
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
 
  function Repo(uint256 minimum, address creator) public payable {
       manager = creator;
       minimumContribution = minimum;
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
   
   function getAudioFilesCount() public view returns (uint256) {
      return audioFiles.length;
    }
}
