import React from "react";
import { Player, BigPlayButton } from "video-react";
import { Link } from "wouter";

import {Container, Row, Col, Form,} from "react-bootstrap";

import UploadIcon from '../../src/assets/images/cloud-upload.svg';
import '../../node_modules/video-react/dist/video-react.css'; // import css

import '../assets/styles/Upload.css'

export default function Upload() {
  return (
	<>	
		<div className="home-page-wrap upload-page">
			<Container className="p-3">
				<h2>Upload</h2>
                <Form>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className="d-flex align-items-center flex-column">
                                <Form.Group className="mb-3 title-input w-100" controlId="formBasicTitle">
                                    <Form.Control as="textarea" type="text" placeholder="Title" />
                                </Form.Group>
                                <Form.Group className="mb-3 description-input w-100" controlId="formBasicDescription">
                                    <Form.Control as="textarea" type="text" placeholder="Decription" />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" className="mb-5">
                                    <option>Uploads Options</option>
                                    <option value="1">Private</option>
                                    <option value="2">Public</option>
                                </Form.Select>
                                <div className="upload-btn-group header-btn-group">
                                    <Link to="/" className="main-btn-1">
                                        Publish
                                    </Link>
                                    <Link to="/" className="main-btn-2">
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            {/* <div className="upload-box">
                                <h3>Upload Video</h3>
                                <div className="upload-icon">
                                    <img src={UploadIcon} alt="icon" className="img-fluid" />
                                </div>
                                <p>Drag and drop video files to upload</p>
                            </div> */}

                            <div className="upload-container">
                                <div className="upload-container-wrapper">
                                    <div className="upload-svg">
                                        <svg height="40" viewBox="0 0 1792 1792" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"/></svg>
                                        <input type="file" id="myfile" name="myfile" accept="image/gif,image/png,image/jpeg,image/bmp,image/webp,video/webm,video/ogg,video/mp4,video/mpeg" hidden="" />
                                    </div>
                                    {/* <video controls><source src="" type="video/mp4" /></video>
                                    <img src="" alt="" className="img-fluid" /> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
				
			</Container>
		</div>
	</>
  );
}
