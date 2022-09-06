import point from "./PointSDK"

const EMPTY = '0x0000000000000000000000000000000000000000';

class TubeManager {
    static getAllVideosLength = async () => point.contractCall("TubePoint", "getAllVideosLength", []);
    static getVideo = async (fileId) => point.contractCall("TubePoint", "getVideo", [fileId]);
    static uploadVideo = async (fileId) =>
        point.contractCall("TubePoint", "uploadVideo", [
            (fileId) ? fileId : EMPTY
        ]);

    // static deletePost = async (postId) => point.contractCall("PointSocial", "deletePost", [postId]);
    // static editPost = async (postId, contentId, imageId) => {
    //     return point.contractCall("PointSocial", "editPost", [
    //         postId,
    //         (contentId) ? contentId : EMPTY,
    //         (imageId) ? imageId : EMPTY
    //     ]);
    // }
    // static flagPost = async (postId) => point.contractCall("PointSocial", "flagPost", [postId]);
    // static addLikeToPost = async (postId) => point.contractSend("PointSocial", "addLikeToPost", [postId]);
    // static addDislikeToPost = async (postId) => point.contractSend("PointSocial", "addDislikeToPost", [postId]);
    // static getAllPostsByOwnerLength = async (account) => point.contractCall("PointSocial", "getAllPostsByOwnerLength", [account]);
    // static getPaginatedPostsByOwner = async (account, length, amount) => point.contractCall("PointSocial", "getPaginatedPostsByOwner", [account, length, amount]);
    // static getPaginatedPosts = async (length, amount) => point.contractCall("PointSocial", "getPaginatedPosts", [length, amount]);
    // static checkLikeToPost = async (postId) => point.contractCall("PointSocial", "checkLikeToPost", [postId]);
}

export default TubeManager