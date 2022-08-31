import React from "react";
import { Player, BigPlayButton } from "video-react";
import { Link } from "wouter";
// import Select from 'react-select'
import {Container, Row, Col, Form,} from "react-bootstrap";
import UploadIcon from '../../src/assets/images/cloud-upload.svg';
// import "node_modules/video-react/dist/video-react.css"; 
import '../../node_modules/video-react/dist/video-react.css'; // import css
import '../assets/styles/Preview.css'

export default function Preview() {
        
  return (
	<>	
		<div className="home-page-wrap preview-page">
			<Container className="p-3">
				<h2>Preview</h2>
                    <Form>
                        <Row className="align-items-center">
                            <Col md={5}>
                                <Form.Group className="mb-3 title-input" controlId="formBasicTitle">
                                    <Form.Control as="textarea" type="text" placeholder="Title" />
                                </Form.Group>
                                <Form.Group className="description-input" controlId="formBasicDescription">
                                    <Form.Control as="textarea" type="text" placeholder="Decription" />
                                </Form.Group>
                                <div className="upload-btn-group header-btn-group">
                                    <Link to="/" className="main-btn-1">
                                        Publish
                                    </Link>
                                    <Link to="/" className="main-btn-2">
                                        Back
                                    </Link>
                                </div>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={7}>
                                <div className="video-card">
                                    <Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
                                        <BigPlayButton position="center" />
                                    </Player>
                                </div>
                            </Col>
                        </Row>
                    </Form>
			</Container>
		</div>
	</>
  );
}
