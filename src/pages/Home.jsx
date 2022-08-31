import React from "react";
import { Player, BigPlayButton } from "video-react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link } from "wouter";
import { useAppContext } from "../context/AppContext";
import Wallet from "../components/Wallet";
import { useState, useEffect } from "react";
// import "node_modules/video-react/dist/video-react.css"; 
import '../../node_modules/video-react/dist/video-react.css'; // import css

import '../assets/styles/Home.css'


export default function Home() {
  const { walletAddress } = useAppContext();
  const [currentPointNodeVersion, setCurrentPointNodeVersion] = useState("");
  const [requiredPointNodeVersion, setRequiredPointNodeVersion] = useState("");
  const [requiredPointSDKVersion, setRequiredPointSDKVersion] = useState("");

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

  let currentVersionSDK = window.point.version;

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <>
      <div className="home-page-wrap">
        <Container className="p-3">
			<Row>
				<h2>Home</h2>
			</Row>
			<Row>
			<Col xl={3} lg={4} sm={6}>
			<div className="video-card">
				<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
					<BigPlayButton position="center" />
				</Player>
			</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			<Col xl={3} lg={4} sm={6}>
				<div className="video-card">
					<Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
						<BigPlayButton position="center" />
					</Player>
				</div>
			</Col>
			</Row>
        </Container>
      </div>
    </>
  );
}
