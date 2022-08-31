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

export default function Examples() {
  return (
	<>	
		<div className="home-page-wrap">
			<Container className="p-3">
				<Row>
					<h2>My Videos</h2>
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
