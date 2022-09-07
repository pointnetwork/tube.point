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
        uint256 id;
        address from;
        bytes32 fileId;
        string title;
        string desc;
        uint256 timestamp;
    }
    struct Comment {
        address user;
        string message;
        uint256 timestamp;
    }
    struct Like {
        uint256 counter;
        mapping(address => bool) userAddress;
    }

    mapping(uint256 => File) public files;
    mapping(address => File[]) public userLinkedFiles;
    mapping(uint256 => Comment[]) public comments;
    mapping(address => File[]) public playlist;
    mapping(uint256 => Like) public likes;

    event FileUploaded(
        uint256 id,
        bytes32 fileId,
        address from,
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
     * @param fileId : fileId
     */

    function uploadVideo(
        string memory title,
        string memory desc,
        bytes32 fileId
    ) public {
        require(msg.sender != address(0));

        // increase the number of files is using a counter
        fileCount.increment();

        files[fileCount.current()] = File(
            fileCount.current(),
            msg.sender,
            fileId,
            title,
            desc,
            block.timestamp
        );

        userLinkedFiles[msg.sender].push(files[fileCount.current()]);

        emit FileUploaded(
            fileCount.current(),
            fileId,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @dev updateVideo function use to update the file metadata to the smart contract files mapping
     * @param id : id of the file
     * @param title : title of the file
     * @param desc : desc of the file metadata
     * @param fileId : fileId of the file metadata
     */

    function updateVideo(
        uint256 id,
        string memory title,
        string memory desc,
        bytes32 fileId
    ) public {
        require(id > 0);
        File storage file = files[id];
        require(msg.sender == file.from, "You cannot edit this video");
        require(file.from != address(0), "Record not found");

        file.title = title;
        file.desc = desc;
        file.fileId = fileId;
        file.timestamp = block.timestamp;

        emit FileUploaded(id, fileId, msg.sender, block.timestamp);
    }

    // get detail of specific video file to show
    function getVideo(uint256 fileId) public view returns (File memory) {
        return files[fileId];
    }

    /**
     * @dev like function use to like the specific video from frontend
     * @param id : id of the file
     */

    function like(uint256 id) public {
        Like storage _like = likes[id];
        require(
            _like.userAddress[msg.sender] == false,
            "You already liked this video"
        );
        _like.counter++;
        _like.userAddress[msg.sender] = true;
    }

    // get total number of likes of specific video

    function getLikes(uint256 id) public view returns (uint256) {
        return (likes[id].counter);
    }

    /**
     * @dev dislike function use to dislike the specific video from frontend
     * @param id : id of the file
     */

    function dislike(uint256 id) public {
        Like storage _like = likes[id];
        bool status = _like.userAddress[msg.sender];
        _like.userAddress[msg.sender] = false;
        if (status == true && _like.counter > 0) {
            _like.counter--;
        }
    }

    // get total comments of specific video

    function getComments(uint256 id) public view returns (Comment[] memory) {
        return comments[id];
    }

    /**
     * @dev addToPlaylist function use to store the user selected video to the smart contract playlist mapping
     * @param id : id of the file
     */

    function addToPlaylist(uint256 id) public {
        bool flag = false;
        for (uint256 i = 0; i < playlist[msg.sender].length; i++) {
            if (playlist[msg.sender][i].id == id) {
                flag = true;
                break;
            }
        }

        require(flag == false, "you have already added this video in playlist");
        playlist[msg.sender].push(files[id]);
    }

    // get playlist of specific user

    function getPlaylist(address _address) public view returns (File[] memory) {
        return playlist[_address];
    }

    function getAllVideosLength() public view returns (uint256) {
        return fileCount.current();
    }
}
