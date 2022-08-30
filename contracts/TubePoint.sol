// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TubePoint is Initializable, UUPSUpgradeable, OwnableUpgradeable{
    uint256 public fileCount = 0;

    struct File {
        uint256 fileId;
        string fileName;
        string fileUri;
        address uploader;
        uint256 timestamp;
    }

    mapping(uint256 => File) public files;
    mapping(address => uint256[]) public userLinkedFiles;
    mapping(uint256 => address[]) public likes;
    mapping(uint256 => address[]) public dislikes;
    mapping(uint256 => address[]) public views;

    struct Comment {
        address user;
        string message;
        uint256 timestamp;
    }

    mapping(uint256 => Comment[]) public comments;
    mapping(address => uint256[]) public playlist;

    /**
    * Events
    */

    event FileUploaded(
        uint256 fileId,
        string fileName,
        string fileUri,
        address uploader,
        uint256 timestamp
    );

    event Commented(
        address user,
        string message,
        uint256 timestamp
    );

    // we upload the file metadata to the smart contract files
    // mapping in order to persist the information.

    function uploadVideo(
        string memory _fileName,
        string memory _fileUri
    ) public {
        require(bytes(_fileName).length > 0);
        require(bytes(_fileUri).length > 0);
        require(msg.sender != address(0));
        
        // increase the number of files is using a counter
        fileCount++;

        files[fileCount] = File(
            fileCount,
            _fileName,
            _fileUri,
            msg.sender,
            block.timestamp
        );
        
        // From the frontend application
        // we can listen the events emitted from
        // the smart contract in order to update the UI.
        emit FileUploaded(
            fileCount,
            _fileName,
            _fileUri,
            msg.sender,
            block.timestamp
        );

        userLinkedFiles[msg.sender].push(fileCount);
    }

    // get detail of specific video file to show

    function getVideo(uint256 fileId)
        public
        view
        returns (
            File memory
        )
    {
        return files[fileId];
    }

    // like specific video from frontend

    function like(
        uint256 _fileId,
        address _address
    ) public {
        likes[_fileId].push(_address);
    }

    // get total number of likes of specific video

    function getLikes(uint256 fileId)
        public
        view
        returns (
            address[] memory
        )
    {
        return likes[fileId];
    }

    // dislike specific video from frontend

    function dislike(
        uint256 _fileId,
        address _address
    ) public {
        dislikes[_fileId].push(_address);
    }

    // get total number of dislikes of specific video

    function getDislikes(uint256 fileId)
        public
        view
        returns (
            address[] memory
        )
    {
        return dislikes[fileId];
    }

    // store the address of user who watch the video

    function watch(
        uint256 _fileId,
        address _address
    ) public {
        views[_fileId].push(_address);
    }

    // get total number of views of specific video

    function getViews(uint256 fileId)
        public
        view
        returns (
            address[] memory
        )
    {
        return views[fileId];
    }

    // we store the user comment to the smart contract comments
    // mapping in order to persist the information.

    function comment(
        string memory _message,
        uint256 _fileId
    ) public {
        require(bytes(_message).length > 0);
        require(msg.sender != address(0));

        comments[_fileId].push(Comment(
            msg.sender,
            _message,
            block.timestamp
        ));
        
        // From the frontend application
        // we can listen the events emitted from
        // the smart contract in order to update the UI.
        emit Commented(
            msg.sender,
            _message,
            block.timestamp
        );
    }

    // get total comments of specific video

    function getComments(uint256 fileId)
        public
        view
        returns (
            Comment[] memory
        )
    {
        return comments[fileId];
    }

    // we store the user selected video to the smart contract playlist
    // mapping in order to create or update the playlist.

    function addToPlaylist(
        uint256 _fileId
    ) public {
        playlist[msg.sender].push(_fileId);
    }

    // get playlist of specific user

    function getPlaylist(address _address)
        public
        view
        returns (
            uint256[] memory
        )
    {
        return playlist[_address];
    }
}
