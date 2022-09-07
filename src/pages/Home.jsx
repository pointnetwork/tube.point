import React from "react";
import { Player, BigPlayButton } from "video-react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link } from "wouter";
import { useAppContext } from "../context/AppContext";
import Wallet from "../components/Wallet";
import { useState, useEffect } from "react";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Home.css";
import TubeManager from "../services/TubeManager";
import point from "../services/PointSDK";

export default function Home() {
  const { walletAddress } = useAppContext();
  const [currentPointNodeVersion, setCurrentPointNodeVersion] = useState("");
  const [requiredPointNodeVersion, setRequiredPointNodeVersion] = useState("");
  const [requiredPointSDKVersion, setRequiredPointSDKVersion] = useState("");
  const [length, setLength] = useState(0);
  const [videos, setVideos] = useState([]);
  const _videos = [];

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  const fetchVersions = async () => {
    let pointNodeVersion = (await (await fetch("/v1/api/status/meta")).json())
      .data.pointNodeVersion;
    setCurrentPointNodeVersion(pointNodeVersion);

    const ikvsetFetched = await window.point.contract.events({
      host: "@",
      contract: "Identity",
      event: "IKVSet",
      filter: { identity: "template" },
    });
    if (ikvsetFetched.data != "") {
      let events = ikvsetFetched.data.reverse();
      let requiredSdkVersion = "";
      let requiredNodeVersion = "";
      for (const e of events) {
        if (
          requiredSdkVersion === "" &&
          e.data.key === "zweb/point/sdk/version"
        ) {
          requiredSdkVersion = e.data.value;
        }
        if (
          requiredNodeVersion === "" &&
          e.data.key === "zweb/point/node/version"
        ) {
          requiredNodeVersion = e.data.value;
        }
      }
      setRequiredPointNodeVersion(requiredNodeVersion);
      setRequiredPointSDKVersion(requiredSdkVersion);
    }
  };

  const getVideos = async () => {
    try {
      TubeManager.getAllVideosLength().then(function (_length) {
        for (var i = 1; i <= _length; i++) {
          TubeManager.getVideo(i).then(async function (_data) {
            if (_data[0] != "0") {
              console.log('_data',_data[2])
              _data[2] = await window.point.storage.getFile({id: _data[2]})
              console.log('_data[2]',_data[2])
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

  let currentVersionSDK = window.point.version;

  useEffect(() => {
    getVideos();
    fetchVersions();
  }, []);

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div className="pagination-wrapper">
      <Pagination>{items}</Pagination>
    </div>
  );

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
                        // src={`/_storage/${_item[2]}`}
                        src={URL.createObjectURL(_item[2])}
                        >
                          <BigPlayButton position="center" />
                        </Player>
                        <Link to='/video-detail/' className="video-name mb-0">{_item[3]}</Link>
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
          {/* {paginationBasic} */}
        </Container>
      </div>
    </>
  );
}
