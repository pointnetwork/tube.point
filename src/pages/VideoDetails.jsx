import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScissors,
  faShare,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import TubeManager from "../services/TubeManager";
import Moment from "react-moment";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comments from "./Comments";
import "../assets/styles/VideoDetail.css";
import point from "../services/PointSDK";

const VideoDetails = ({ name }) => {
  const [identityName, setIdentityName] = useState("");
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { id: paramsId } = useParams();

  const start = moment().add(-4, "m");

  const getVideo = async (_id) => {
    try {
      TubeManager.getVideo(_id).then(async function (_data) {
        if (_data[0] != "0") {
          // _data[2] = await window.point.storage.getFile({ id: _data[2] });
          setVideo(_data);
          let wallet = await point.ownerToIdentity(_data[1]);
          setIdentityName(wallet['identity']);
          TubeManager.getLikes(_id).then(async function (_likes) {
            setLikes(_likes);
          });
          TubeManager.isSubscribed(_data[1]).then(async function (_isSubscribed) {
            setIsSubscribed(_isSubscribed);
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const likeHandler = async () => {
    try {
      await TubeManager.like(parseInt(paramsId));
      toast.success("Video Liked 👍", { position: "bottom-center" });
      TubeManager.getLikes(parseInt(paramsId)).then(async function (_likes) {
        setLikes(_likes);
      });
    } catch (error) {
      let er = error.message;
      er = er.replace("VM Exception while processing transaction: revert", "");
      toast.error(er, { position: "bottom-center" });
    }
  };

  const unlikeHandler = async () => {
    try {
      await TubeManager.dislike(parseInt(paramsId));
      toast.success("Video Disliked 👎", { position: "bottom-center" });
      TubeManager.getLikes(parseInt(paramsId)).then(async function (_likes) {
        setLikes(_likes);
      });
    } catch (error) {
      let er = error.message;
      er = er.replace("VM Exception while processing transaction: revert", "");
      toast.error(er, { position: "bottom-center" });
    }
  };

  const subscribeHandler = async () => {
    try {
      await TubeManager.subscribe(video[1]);
      toast.success("Subscribed", { position: "bottom-center" });
      TubeManager.isSubscribed(video[1]).then(async function (_isSubscribed) {
        setIsSubscribed(_isSubscribed);
      });
    } catch (error) {
      let er = error.message;
      er = er.replace("VM Exception while processing transaction: revert", "");
      toast.error(er, { position: "bottom-center" });
    }
  };

  const unSubscribeHandler = async () => {
    try {
      await TubeManager.unSubscribe(video[1]);
      toast.success("Unsubscribed", { position: "bottom-center" });
      TubeManager.isSubscribed(video[1]).then(async function (_isSubscribed) {
        setIsSubscribed(_isSubscribed);
      });
    } catch (error) {
      let er = error.message;
      er = er.replace("VM Exception while processing transaction: revert", "");
      toast.error(er, { position: "bottom-center" });
    }
  };

  useEffect(() => {
    getVideo(paramsId);
    // loadComments(paramsId);
  }, []);

  return (
    <>
      <section className="video-details">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="video-content-wrapper">
                {video ? (
                  <>
                    <div className="video-player">
                    <Player 
                        // src={URL.createObjectURL(video[2])}
                         src={`/_storage/${video[2]}`}>
                        <BigPlayButton position="center" />
                      </Player>
                    </div>
                    <div className="name-views">
                      <h4 className="name">{video[3]}</h4>
                      <div className="views-social-icons d-flex justify-content-between align-items-center">
                        <span className="views">
                          0 views *{" "}
                          <Moment unix format="LL">
                            {video[5]}
                          </Moment>
                        </span>
                        <div className="social-icons d-flex">
                          <div
                            className="icon d-flex align-items-center me-3"
                            onClick={likeHandler}
                          >
                            <FontAwesomeIcon
                              className="me-1"
                              icon={faThumbsUp}
                            />{" "}
                            <span>{likes}</span>
                          </div>
                          <div
                            className="icon d-flex align-items-center me-3"
                            onClick={unlikeHandler}
                          >
                            <FontAwesomeIcon
                              className="me-1"
                              icon={faThumbsDown}
                            />{" "}
                            <span>Dislike</span>
                          </div>
                    {isSubscribed && isSubscribed == true ? <><div
                            className="icon d-flex align-items-center me-3 unsubscribe-btn"
                            onClick={unSubscribeHandler}
                          >
                            <span>Subscribed</span>
                          </div></> :  <><div
                            className="icon d-flex align-items-center me-3 subscribe-btn"
                            onClick={subscribeHandler}
                          >
                            <span>Subscribe</span>
                          </div></>}

                        </div>
                      </div>
                    </div>
                    <div className="address-description">
                      <div className="address">
                      <p className="video-author mb-0">
                            <span>{identityName}</span>
                            <br/>
                            <span>{video[1].substring(0, 2) +
                              " ... " +
                              video[1].substring(
                                video[1].length,
                                video[1].length - 3
                              )}</span>
                          </p>
                      </div>
                      <div className="description">
                        <p>{video[4]}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  "Loading..."
                )}
              </div>
            </Col>
            <Col lg={3}>
              <Comments />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default VideoDetails;
