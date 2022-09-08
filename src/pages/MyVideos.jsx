import React, { useState, useEffect } from "react";
import { Player, BigPlayButton } from "video-react";
import point from "../services/PointSDK";
import { Container, Row, Col} from "react-bootstrap";
import TubeManager from "../services/TubeManager";
import { toast } from "react-toastify";
import { Link } from "wouter";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Home.css";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function MyVideos() {
  const [address, setAddress] = useState(undefined);
  const [videos, setVideos] = useState([]);

  const getAccount = async () => {
    try {
      let wallet = await point.getWalletAddress();
      setAddress(wallet.address);
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
    }
  };

  const getVideos = async () => {
    try {
      TubeManager.getAllVideosLength().then(function (_length) {
        for (var i = 1; i <= _length; i++) {
          TubeManager.getVideo(i).then(async function (_data) {
            if (_data[0] != "0" && _data[1].toString().toLowerCase() === address.toString().toLowerCase()) {
              _data[2] = await window.point.storage.getFile({ id: _data[2] });
              setVideos((video) => [...video, _data]);
            }
          });
        }
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
                        <Player src={URL.createObjectURL(_item[2])}>
                          <BigPlayButton position="center" />
                        </Player>
                        <div className="video-dd d-flex justify-content-between align-items-end">
                          <div>
                            <Link
                            to={`/video-detail`}
                            className="video-name mb-0"
                          >
                            {_item[3]}
                          </Link>
                          <p className="video-author mb-0">
                            {_item[1].substring(0, 2) +
                              " ... " +
                              _item[1].substring(
                                _item[1].length,
                                _item[1].length - 3
                              )}
                          </p>
                          </div>
                          <Link to="/edit-video"><FontAwesomeIcon className="edit-video" icon={faPenToSquare} /></Link>
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
