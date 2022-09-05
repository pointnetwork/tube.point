import {React , useRef, createRef } from "react";
import { Player, BigPlayButton } from "video-react";
import { Link } from "wouter";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UploadIcon from "../../src/assets/images/cloud-upload.svg";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Upload.css";
import { Input } from "@material-ui/icons";
import PostManager from '../services/PostManager';
import point from "../services/PointSDK";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MEDIA_TYPES = "image/gif,image/png,image/jpeg,image/bmp,image/webp,video/webm,video/ogg,video/mp4,video/mpeg";

export default function Upload() {
  const [saving, setSaving] = useState();
  const [alert, setAlert] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [contents, setContents] = useState();
  const [shareError, setShareError] = useState();
  const [btnEnabled, setBtnEnabled] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState("");
  const [source, setSource] = useState();
  const [media, setMedia] = useState();
  const [mediaType, setMediaType] = useState();

  const inputRef = useRef();
  const mediaRef = createRef();
//   const mediaRef = useRef(null);

  const changeHandler = (event) => {

    try {
        const file = event.target.files[0]; 
        if (file && (file.size <= MAX_FILE_SIZE)) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(event.target.files[0]);
          fileReader.onload = (e) => {
            const data = e.srcElement.result;

            const contentType = data.substring(data.indexOf(':')+1,data.indexOf(';'));
            if (!MEDIA_TYPES.split(",").includes(contentType)) {
                alert("The selected file format is unsupported, please select another file");
                return;
            }

            setMediaType(data.substring(data.indexOf(':')+1,data.indexOf('/'))); 
            setMedia(data);
          };  
        }
        else if (file && (file.size > MAX_FILE_SIZE)) {
            alert("For now, Point Social only supports files up to 100 MB. Please select a smaller media file.");
        }    
    }
    catch(error) {
        console.log(error.message);
    }

    // let fileToUpload = event.target.files[0];
    // if (fileToUpload.type.startsWith("video")) {
    //   setSelectedFile(event.target.files[0]);
    //   setBtnEnabled(true);
    // } else {
    //     alert("Point tube only supports video uploads for now. Please change to an video file!");
    // }
  };

  const HandleTitle = (event) => {
    setTitle(event.target.value);
  };
  const HandleDescription = (event) => {
    setDescription(event.target.value);
  };
  const HandleOptions = (event) => {
    setDescription(event.target.value);
  };

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
    console.log('mimeString',byteString.length)
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)
    
    return new Blob([ia], { type: mimeString })
}

async function saveFile(file) {
    const formData = new FormData();
    formData.append("postfile", await (await fetch(file)).blob());
    console.log('formData',formData)
    const storageId = await point.postFile(formData);
    console.log('storageId',storageId)
    return storageId;
}

  const uploadVideo = async (e) => {
    e.preventDefault();
    // console.log("media",media)
    // console.log("mediaRef.current",mediaRef.current)
    try {
    //   const media = mediaRef && mediaRef.current && media;
    //   if (!(media)) {
    //     console.log('here')
    //     // setAlert("Please upload a video.");
    //     return;
    //   }
    console.log('here')
    console.log('here',media)
    //   setProcessing(true);
    //   setLoading(true);
      const videoId = media ? await saveFile(media) : EMPTY;
      console.log('videoId',videoId)
      await PostManager.uploadVideo(videoId);

    //   setAlert("Your video is published successfully !|success");
    //   reset();
    } catch (error) {
        console.log(error)
    //   setAlert(error.message);
    } finally {
    //   setLoading(false);
    //   setProcessing(false);
    }
  };

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     console.log("file", selectedFile);
  //     // let fileInputRef ;
  //     let EMPTY_TEXT;
  //     let EMPTY_IMAGE;
  //     // let PostManager ;
  //     // let reloadPosts ;
  //     // setSaving(true);
  //     // try {
  //     // Save the post content to the storage layer and keep the storage id
  //     //   let {data: storageId} = (contents && contents.trim().length > 0)? await window.point.storage.putString({data: contents}) : { data: EMPTY_TEXT };
  //     let imageId = EMPTY_IMAGE;
  //     //   console.log(selectedFile)
  //     if (selectedFile) {
  //       console.log("awlw", selectedFile);
  //       const formData = new FormData();
  //       formData.append("postfile", selectedFile);
  //       console.log("formData", formData);

  //       const res = await window.point.storage.postFile(formData);
  //       console.log("res", res);
  //       imageId = res.data;
  //       console.log(imageId);
  //     }
  //     // Save the post contents storage id in the PoinSocial Smart Contract
  //     //   await PostManager.addPost(storageId, imageId)
  //     //   await reloadPosts();
  //     //   setSaving(false);
  //     //   setContents('');
  //     //   setSelectedFile();
  //     //   fileInputRef.current.value = null
  //     //   setBtnEnabled(false);
  //     // } catch (e) {
  //     // console.log(e)
  //     //   console.error('Error sharing post: ', e.message);
  //     //   setSaving(false);
  //     //   setContents('');
  //     //   setSelectedFile();
  //     //   fileInputRef.current.value = null
  //     //   setBtnEnabled(false);
  //     //   setShareError(e);
  //     //   setAlert(true);
  //     // }
  //   };

  return (
    <>
      <div className="home-page-wrap upload-page">
        <Container className="p-3">
          <h2>Upload</h2>
          <Form onSubmit={uploadVideo}>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="d-flex align-items-center flex-column">
                  <Form.Group
                    className="mb-3 title-input w-100"
                    controlId="formBasicTitle"
                  >
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Title"
                      onChange={HandleTitle}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 description-input w-100"
                    controlId="formBasicDescription"
                  >
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Decription"
                      onChange={HandleDescription}
                    />
                  </Form.Group>
                  <Form.Select
                    aria-label="Default select example"
                    className="mb-5"
                    onChange={HandleOptions}
                  >
                    <option>Uploads Options</option>
                    <option value="1">Private</option>
                    <option value="2">Public</option>
                  </Form.Select>
                  <div className="upload-btn-group header-btn-group">
                    <Button type="submit" className="main-btn-1">
                      Publish
                    </Button>
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
                      <svg
                        height="40"
                        viewBox="0 0 1792 1792"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z" />
                      </svg>
                      <input
                        type="file"
                        id="myfile"
                        name="myfile"
                        accept="image/gif,image/png,image/jpeg,image/bmp,image/webp,video/webm,video/ogg,video/mp4,video/mpeg"
                        hidden=""
                        ref={mediaRef}
                        onChange={changeHandler}
                      />
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
