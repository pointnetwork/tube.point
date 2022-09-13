import React from "react";
import { Player, BigPlayButton } from "video-react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import TubeManager from "../services/TubeManager";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Home.css";

export default function Home() {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      TubeManager.getAllVideosLength().then(function (_length) {
        for (var i = 1; i <= _length; i++) {
          TubeManager.getVideo(i).then(async function (_data) {
            if (_data[0] != "0") {
              // _data[2] = await window.point.storage.getFile({id: _data[2]})
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
    getVideos();
  }, []);

  return (
    <>
      <div className="home-page-wrap">
        <Container className="p-3">
          <Row>
            <h2>Home</h2>
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
                        <Link to={`/video-detail/`+_item[0]} className="video-name mb-0">{_item[3]}</Link>
                        <p className="video-author mb-0">
                          {_item[1].substring(0, 2) +
                            " ... " +
                            _item[1].substring(
                              _item[1].length,
                              _item[1].length - 3
                            )}
                        </p>
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
