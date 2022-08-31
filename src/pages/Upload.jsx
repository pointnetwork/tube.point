import React from "react";
import { Player, BigPlayButton } from "video-react";
import { Link } from "wouter";

import Container from "react-bootstrap/Container";
import UploadIcon from '../../src/assets/images/cloud-upload.svg';
// import "node_modules/video-react/dist/video-react.css"; 
import '../../node_modules/video-react/dist/video-react.css'; // import css

import '../assets/styles/Upload.css'

export default function Examples() {
  return (
	<>	
		<div className="home-page-wrap upload-page">
			<Container className="p-3">
				<h2>Upload</h2>
				<div className="upload-box">
                    <h3>Upload Video</h3>
                    <div className="upload-icon">
                        <img src={UploadIcon} alt="icon" className="img-fluid" />
                    </div>
                    <p>Drag and drop video files to upload</p>
                </div>
                <div className="upload-btn-group header-btn-group">
                    <Link to="/" className="main-btn-1">
                        Discard Changes
                    </Link>
                    <Link to="/preview" className="main-btn-2">
                        Next
                    </Link>
                </div>
			</Container>
		</div>
	</>
  );
}
