import { Link } from "react-router-dom";
import { Player, BigPlayButton } from "video-react";
import { Col } from "react-bootstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/VideoCard.css";

export default function VideoCard({ video, identityName, enableEdit=false }) {
  return (
    <Col xl={3} lg={4} sm={6}>
      <div className="video-card">

        <div className="video-player">
          <Player
            src={`/_storage/${video[2]}`}
            aspectRatio="16:9"
          >
            <BigPlayButton position="center" />
          </Player>
        </div>

        <div className="video-information">
          <Link
            to={`/video-detail/${video[0]}`}
            className="title"
          >
            {video[3]}
          </Link>

          <div className="video-footer">
            <p>
              <span className="author">@{identityName}</span>
              <span className="separator">&bull;</span>
              <Moment unix format="LL">
                {video[5]}
              </Moment>
            </p>

            {enableEdit && (
              <Link to={`/edit-video/${video[0]}`}>
                <FontAwesomeIcon
                  className="edit-video"
                  icon={faPenToSquare}
                  />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
}