import { React, useRef, createRef, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import TubeManager from "../services/TubeManager";
import point from "../services/PointSDK";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Upload.css";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MEDIA_TYPES = "video/webm,video/ogg,video/mp4,video/mpeg,video/mov,video/quicktime";

const EditVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [media, setMedia] = useState();
  const [mediaType, setMediaType] = useState();
  const mediaRef = createRef();
  const [video, setVideo] = useState(null);
  const { id: paramsId } = useParams();
  const navigate = useNavigate();
  const [identityName, setIdentityName] = useState("");
  const [address, setAddress] = useState(undefined);

  const getAccount = async () => {
    try {
      let wallet = await point.getIdentity();
      setIdentityName(wallet['identity']);
      setAddress(wallet['address']);
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
    }
  };

  const getVideo = async (_id) => {
    try {
      TubeManager.getVideo(_id).then(async function (_data) {
        if (_data[0] != "0") {
          _data[2] = await window.point.storage.getFile({ id: _data[2] });
          setVideo(_data);
          setTitle(_data[3]);
          setDescription(_data[4]);
          setMediaType('video');
          setMedia(await blobToBase64(_data[2]))
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getVideo(paramsId);
  }, []);

  const changeHandler = (event) => {
    try {
      const file = event.target.files[0];
      if (file && file.size <= MAX_FILE_SIZE) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = (e) => {
          const data = e.srcElement.result;
          const contentType = data.substring(
            data.indexOf(":") + 1,
            data.indexOf(";")
          );
          if (!MEDIA_TYPES.split(",").includes(contentType)) {
            toast.warning(
              "The selected file format is unsupported, please select another file",
              { position: "bottom-center" }
            );
            return;
          }
          setMediaType(
            data.substring(data.indexOf(":") + 1, data.indexOf("/"))
          );
          setMedia(data);
        };
      } else if (file && file.size > MAX_FILE_SIZE) {
        toast.warning(
          "For now, Point Social only supports files up to 100 MB. Please select a smaller media file.",
          { position: "bottom-center" }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  async function saveFile(file) {
    const formData = new FormData();
    formData.append("postfile", DataURIToBlob(file));
    const storageId = await point.postFile(formData);
    return storageId;
  }

  const updateVideo = async (e) => {
    e.preventDefault();
    let validate = validateForm();
    if (!validate) {
      return;
    }
    try {
      if (!media) {
        toast.warning("Please upload a video.", { position: "bottom-center" });
        return;
      }
      const videoId = await saveFile(media);
      await TubeManager.updateVideo(
        parseInt(video[0]),
        title,
        description,
        videoId
      );
      toast.success("Your video is updated successfully !", {
        position: "bottom-center",
      });
      navigate('/my-videos');
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
    }
  };

  const clearMedia = () => {
    setMedia(undefined);
    setMediaType(undefined);
  };

  const goBack = () => {
    history.back();
  };

  const validateForm = () => {
    let validate = true;
    if (title === "") {
      setTitleError("Please enter video title");
      validate = false;
    } else {
      setTitleError("");
    }
    if (description === "") {
      setDescriptionError("Please enter video description");
      validate = false;
    } else {
      setDescriptionError("");
    }
    return validate;
  };

  return (
    <>
      <div className="home-page-wrap upload-page">
        <Container>
          <h3 className="section-subtitle">Edit Video</h3>
          <hr className="section-separator" />

          <Form onSubmit={updateVideo}>
            <Row>
              <Col lg={6}>
                <div className="d-flex flex-column">
                  <Form.Group
                    className="mb-3 title-input w-100"
                    controlId="formBasicTitle"
                  >
                    <Form.Control
                      as="textarea"
                      type="text"
                      value={title}
                      name="title"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="error">{titleError}</div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 description-input w-100"
                    controlId="formBasicDescription"
                  >
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Decription"
                      value={description}
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="error">{descriptionError}</div>
                  </Form.Group>
                  <div className="header-btn-group">
                    <Button
                      type="submit"
                      variant="success"
                      className="main-btn-1"
                    >
                      Publish Changes
                    </Button>
                    <LinkContainer to="/my-videos">
                      <Button
                        variant="dark"
                        className="btn main-btn-1 ms-2"
                      >
                        Back
                      </Button>
                    </LinkContainer>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="upload-container">
                  <div className="upload-container-wrapper">
                    {media === undefined ? (
                      <>
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
                            accept="video/*"
                            hidden=""
                            ref={mediaRef}
                            onChange={changeHandler}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="upload-svg media-remove-icon"
                          onClick={clearMedia}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-minus-circle"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                          </svg>
                        </div>
                      </>
                    )}

                    {mediaType === "image" && (
                      <img src={media} alt="" className="img-fluid" />
                    )}
                    {media && mediaType === "video" && (
                      <video controls>
                        <source src={media}></source>
                      </video>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default EditVideo;
