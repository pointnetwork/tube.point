import point from "./PointSDK";

const EMPTY = "0x0000000000000000000000000000000000000000";

class TubeManager {
  static getAllVideosLength = async () =>
    point.contractCall("TubePoint", "getAllVideosLength", []);
  static getLikes = async (id) =>
    point.contractCall("TubePoint", "getLikes", [id]);
  static getCommentsLength = async (id) =>
    point.contractCall("TubePoint", "getCommentsLength", [id]);

  static getVideo = async (fileId) =>
    point.contractCall("TubePoint", "getVideo", [fileId]);
  static getComments = async (id) =>
    point.contractCall("TubePoint", "getComments", [id]);

  static uploadVideo = async (title, desc, fileId) =>
    point.contractCall("TubePoint", "uploadVideo", [
      title ? title : "",
      desc ? desc : "",
      fileId ? fileId : EMPTY,
    ]);
  static updateVideo = async (id, title, desc, fileId) =>
    point.contractCall("TubePoint", "updateVideo", [
      id,
      title ? title : "",
      desc ? desc : "",
      fileId ? fileId : EMPTY,
    ]);

  static comment = async (message, id) =>
    point.contractCall("TubePoint", "comment", [
      message ? message : "",
      id ? id : "",
    ]);

  static like = async (id) => point.contractCall("TubePoint", "like", [id]);
  static dislike = async (id) =>
    point.contractCall("TubePoint", "dislike", [id]);

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

export default TubeManager;
