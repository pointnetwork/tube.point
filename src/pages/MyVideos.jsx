import React, { useState, useEffect } from "react";
import point from "../services/PointSDK";
import { Container, Row } from "react-bootstrap";
import TubeManager from "../services/TubeManager";
import { toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import "../assets/styles/Home.css";
import "react-toastify/dist/ReactToastify.css";
import VideoCard from "../components/VideoCard";

export default function MyVideos() {
  const [identityName, setIdentityName] = useState("");
  const [address, setAddress] = useState(undefined);
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAccount = async () => {
    try {
      let wallet = await point.getIdentity();
      setIdentityName(wallet["identity"]);
      setAddress(wallet["address"]);
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
    }
  };

  const getVideos = async () => {
    try {
      setLoader(true);

      setTimeout(function() { 


      TubeManager.getVideosByUser(address).then(function (_res) {
        let tempVids = [];
        for (var i = 0; i < _res.length; i++) {
          if (_res[i][0] != "0") {
            tempVids.push(_res[i]);
          }
        }
        console.log("tempVids", tempVids);
        setVideos(tempVids);
        setLoader(false);
      });

    }, 2000);

    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (address) {
      getVideos();
    }
  }, [address]);

  return (
    <>
      <div className="home-page-wrap">
        <Container className="p-3">
          <h3 className="section-subtitle">My Videos</h3>
          <hr className="section-separator" />

          <Row>
            {loader ? (
              <>
                <InfinitySpin width="200" color="#4fa94d" />
              </>
            ) : (
              <>
                {videos.length > 0 && videos.map((_item) => <VideoCard video={_item} enableEdit={true} key={_item[0]} />)}
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}
