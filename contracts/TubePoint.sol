// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TubePoint is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    using Counters for Counters.Counter;
    Counters.Counter internal fileCount;

    struct File {
        uint256 fileId;
        string fileName;
        string fileUri;
        address uploader;
        uint256 timestamp;
    }
    struct Comment {
        address user;
        string message;
        uint256 timestamp;
    }

    mapping(uint256 => File) public files;
    mapping(address => uint256[]) public userLinkedFiles;
    mapping(uint256 => address[]) public likes;
    mapping(uint256 => address[]) public dislikes;
    mapping(uint256 => Comment[]) public comments;

    event FileUploaded(
        uint256 fileId,
        string fileName,
        string fileUri,
        address uploader,
        uint256 timestamp
    );

    event Commented(address user, string message, uint256 timestamp);

    function initialize() public initializer onlyProxy {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    /**
     * @dev uploadVideo function use to upload the file metadata to the smart contract files mapping
     * @param _fileName : name of file
     * @param _fileUri : uri of file metadata
     */

    function uploadVideo(string memory _fileName, string memory _fileUri)
        public
    {
        require(bytes(_fileName).length > 0);
        require(bytes(_fileUri).length > 0);
        require(msg.sender != address(0));

        // increase the number of files is using a counter
        fileCount.increment();

        files[fileCount.current()] = File(
            fileCount.current(),
            _fileName,
            _fileUri,
            msg.sender,
            block.timestamp
        );

        // From the frontend application
        // we can listen the events emitted from
        // the smart contract in order to update the UI.
        emit FileUploaded(
            fileCount.current(),
            _fileName,
            _fileUri,
            msg.sender,
            block.timestamp
        );

        userLinkedFiles[msg.sender].push(fileCount.current());
    }

    // get detail of specific video file to show
    function getVideo(uint256 fileId) public view returns (File memory) {
        return files[fileId];
    }

    /**
     * @dev like function use to like the specific video from frontend
     * @param _fileId : id of the file
     */

    function like(uint256 _fileId) public {
        likes[_fileId].push(msg.sender);
    }

    // get total number of likes of specific video

    function getLikes(uint256 fileId) public view returns (address[] memory) {
        return likes[fileId];
    }

    /**
     * @dev dislike function use to dislike the specific video from frontend
     * @param _fileId : id of the file
     */

    function dislike(uint256 _fileId) public {
        dislikes[_fileId].push(msg.sender);
    }

    // get total number of dislikes of specific video

    function getDislikes(uint256 fileId)
        public
        view
        returns (address[] memory)
    {
        return dislikes[fileId];
    }

    /**
     * @dev comment function use to store the user's comment to the smart contract comments mapping
     * @param _message : message which user will type
     * @param _fileId : id of the file
     */

    function comment(string memory _message, uint256 _fileId) public {
        require(bytes(_message).length > 0);
        require(msg.sender != address(0));

        comments[_fileId].push(Comment(msg.sender, _message, block.timestamp));

        // From the frontend application
        // we can listen the events emitted from
        // the smart contract in order to update the UI.
        emit Commented(msg.sender, _message, block.timestamp);
    }

    // get total comments of specific video

    function getComments(uint256 fileId)
        public
        view
        returns (Comment[] memory)
    {
        return comments[fileId];
    }
}
