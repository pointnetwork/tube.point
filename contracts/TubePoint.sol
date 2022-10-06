// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "point-contract-manager/contracts/IIdentity.sol";

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
    struct Subscribe {
        uint256 counter;
        mapping(address => bool) userAddress;
    }

    mapping(uint256 => File) public files;
    mapping(address => File[]) public userLinkedFiles;
    mapping(uint256 => Comment[]) public comments;
    mapping(address => File[]) public playlist;
    mapping(uint256 => Like) public likes;
    mapping(address => Subscribe) public subscribers;

    // upgradeability variables
    address private identityContractAddress;
    string private identityHandle;

    event FileUploaded(
        uint256 id,
        bytes32 fileId,
        address from,
        uint256 timestamp
    );

    event Commented(address user, string message, uint256 timestamp);

    event FileMigrated(uint256 _id,uint256 _timestamp);

        modifier onlyDeployer() {
        require(
            IIdentity(identityContractAddress).isIdentityDeployer(
                identityHandle,
                msg.sender
            ),
            "Not a deployer"
        );
        _;
    }

    function initialize(
        address _identityContractAddress,
        string calldata _identityHandle
    ) public initializer onlyProxy {
        __Ownable_init();
        __UUPSUpgradeable_init();
        identityContractAddress = _identityContractAddress;
        identityHandle = _identityHandle;
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

    function getPaginatedVideos(uint256 cursor, uint256 howMany)
        public
        view
        returns (File[] memory)
    {
        uint256 length = howMany;
        if (length > fileCount.current()) {
            length = fileCount.current();
        }

        File[] memory file = new File[](length);
        for (uint256 i = 1; i <= length; i++) {
            file[i - 1] = getVideo(cursor);
            cursor++;
        }
        return file;
    }

    function getVideosByUser(address _user)
        public
        view
        returns (File[] memory)
    {
        uint256 totalVideos = userLinkedFiles[_user].length;

        File[] memory file = new File[](totalVideos);
        for (uint256 i = 0; i < totalVideos; i++) {
            file[i] = userLinkedFiles[_user][i];
        }
        return file;
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

    /**
     * @dev comment function use to store the user's comment to the smart contract comments mapping
     * @param _message : message which user will type
     * @param id : id of the file
     */

    function comment(string memory _message, uint256 id) public {
        require(bytes(_message).length > 0);
        require(msg.sender != address(0));

        comments[id].push(Comment(msg.sender, _message, block.timestamp));

        emit Commented(msg.sender, _message, block.timestamp);
    }

    function getComments(uint256 id) public view returns (Comment[] memory) {
        return comments[id];
    }

    function getCommentsLength(uint256 id) public view returns (uint256) {
        return comments[id].length;
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

    function isSubscribed(address _subAddress) public view returns (bool) {
        Subscribe storage _subscribe = subscribers[_subAddress];
        return _subscribe.userAddress[msg.sender];
    }

    function subscribe(address _subAddress) public {
        Subscribe storage _subscribe = subscribers[_subAddress];
        require(
            _subscribe.userAddress[msg.sender] == false,
            "You already subscribed to this user"
        );
        _subscribe.counter++;
        _subscribe.userAddress[msg.sender] = true;
    }

    function getSubscribe(address _subAddress) public view returns (uint256) {
        return (subscribers[_subAddress].counter);
    }

    function unSubscribe(address _subAddress) public {
        Subscribe storage _subscribe = subscribers[_subAddress];
        bool status = _subscribe.userAddress[msg.sender];
        _subscribe.userAddress[msg.sender] = false;
        if (status == true && _subscribe.counter > 0) {
            _subscribe.counter--;
        }
    }


    /**
     * @notice This function should be used to add files to the contract from the migration script
     * @dev Crete and uploads new file to tube point
     * @param _id - File id
     * @param _from - File sender
     * @param title - video title
     * @param desc - video description
     * @param fileId - storageId of the file
     */
    function addFilesFromMigration(
        uint256 _id,
        address _from,
        string memory title,
        string memory desc,
        bytes32 fileId,
        uint256 dateTime
    ) external onlyDeployer {
        
        require(_from != address(0));

        files[_id] = File(
            _id,
            _from,
            fileId,
            title,
            desc,
            dateTime
        );

        userLinkedFiles[msg.sender].push(files[_id]);

        emit FileUploaded(
            _id,
            fileId,
            msg.sender,
            dateTime
        );

        emit FileMigrated(_id, block.timestamp);
    }
}
