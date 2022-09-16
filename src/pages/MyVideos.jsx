import React, { useState, useEffect } from "react";
import { Player, BigPlayButton } from "video-react";
import point from "../services/PointSDK";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import TubeManager from "../services/TubeManager";
import { toast } from "react-toastify";
import { Link } from "wouter";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Home.css";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function MyVideos() {
  const [identityName, setIdentityName] = useState("");
  const [address, setAddress] = useState(undefined);
  const [videos, setVideos] = useState([]);

  const getAccount = async () => {
    try {
      let wallet = await point.getIdentity();
      setIdentityName(wallet['identity']);
      setAddress(wallet['address']);
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
    }
  };

  const getVideos = async () => {
    try {
        TubeManager.getVideosByUser(address).then(function (_res) {
          let tempVids = [];
          for(var i=0;i<_res.length;i++){
            if(_res[i][0] != "0"){
              tempVids.push(_res[i]);
            }
          }
          console.log('tempVids',tempVids)
          setVideos(tempVids);
        });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (address) {
      getVideos();
    }
  }, [address]);

  return (
    <>
      <div className="home-page-wrap">
        <Container className="p-3">
          <Row>
            <h2>My Videos</h2>
          </Row>
          <Row>
            {videos.length > 0 &&
              videos.map((_item) => {
                return (
                  <>
                    <Col xl={3} lg={4} sm={6}>
                      <div className="video-card">
                      <Player 
                        // src={URL.createObjectURL(_item[2])}
                         src={`/_storage/${_item[2]}`}>
                          <BigPlayButton position="center" />
                        </Player>
                        <div className="video-dd d-flex justify-content-between align-items-end">
                          <div>
                            <Link
                            to={`/video-detail/`+_item[0]}
                            className="video-name mb-0"
                          >
                            {_item[3]}
                          </Link>
                          <p className="video-author mb-0">
                            <span>{_item[5]}</span>
                            <br/>
                            <span>{_item[1].substring(0, 2) +
                              " ... " +
                              _item[1].substring(
                                _item[1].length,
                                _item[1].length - 3
                              )}</span>
                          </p>
                          </div>
                          <Link to={`/edit-video/`+_item[0]}><FontAwesomeIcon className="edit-video" icon={faPenToSquare} /></Link>
                        </div>
                      </div>
                    </Col>
                  </>
                );
              })}
          </Row>
        </Container>
      </div>
    </>
  );
}
