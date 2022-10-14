import React from "react";
import { Player, BigPlayButton } from "video-react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TubeManager from "../services/TubeManager";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Home.css";
import point from "../services/PointSDK";
import { InfinitySpin } from "react-loader-spinner";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [totalVideosLength, setTotalVideosLength] = useState(0);
  const [totalPageCounter, setTotalPageCounter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);

  let numberOfPagination = 20;

  const getVideos = async () => {
    try {
      setLoader(true);
      TubeManager.getAllVideosLength().then(function (_length) {
        setTotalVideosLength(_length);
        setTotalPageCounter(
          _length > numberOfPagination
            ? Math.ceil(_length / numberOfPagination)
            : 1
        );
        setCurrentPage(1);
        TubeManager.getPaginatedVideos(currentPage, numberOfPagination).then(
          async function (_res) {
            let tempVids = [];
            for (var i = 0; i < _res.length; i++) {
              if (_res[i][0] != "0") {
                let wallet = await point.ownerToIdentity(_res[i][1]);
                _res[i][_res[i].length] = wallet["identity"];
                tempVids.push(_res[i]);
              }
            }
            setVideos(tempVids);
            setLoader(false);
          }
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  let items = [];
  for (let number = 1; number <= totalPageCounter; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage}>
        {number}
      </Pagination.Item>
    );
  }

  const paginateHandle = (event) => {
    var itemClicked = event.target.text;
    if (itemClicked !== undefined) {
      setLoader(true);
      setCurrentPage(parseInt(itemClicked));
      let cursor = itemClicked > 1 ? (itemClicked - 1) * numberOfPagination : 1;
      TubeManager.getPaginatedVideos(cursor, numberOfPagination).then(function (
        _res
      ) {
        let tempVids = [];
        for (var i = 0; i < _res.length; i++) {
          if (_res[i][0] != "0") {
            tempVids.push(_res[i]);
          }
        }
        setVideos(tempVids);
        setLoader(false);
      });
    }
  };

  return (
    <>
      <div className="home-page-wrap">
        <Container className="p-3">
          <Row>
            <h2>Home</h2>
          </Row>
          <Row>
            {loader ? (
              <>
                <InfinitySpin width="200" color="#4fa94d" />
              </>
            ) : (
              <>
                {videos.length > 0 &&
                  videos.map((_item) => {
                    return (
                      <>
                        <Col xl={3} lg={4} sm={6}>
                          <div className="video-card">
                            <Player
                              src={`/_storage/${_item[2]}`}
                            >
                              <BigPlayButton position="center" />
                            </Player>
                            <Link
                              to={`/video-detail/` + _item[0]}
                              className="video-name mb-0"
                            >
                              {_item[3]}
                            </Link>
                            <p className="video-author mb-0">
                              <span>{_item[6]}</span>
                              <br />
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
              </>
            )}
          </Row>
          {!loader ? <>
            <div className="pagination-wrapper">
            <Pagination onClick={paginateHandle} size="sm">
              {items}
            </Pagination>
          </div>
          </> : <></>}
        </Container>
      </div>
    </>
  );
}
