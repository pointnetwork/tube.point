import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";

const VideoDetails = () => {
    return (
        <>
            <section className="video-details">
                <Container>
                    <Row>
                        <Col lg={9}>
                            <div className="video-content-wrapper">
                                <div className="video-player">
                                    <Player src="https://tube.point/0bf9a909-1f0e-4d4d-9554-987f0950a00d">
                                        <BigPlayButton position="center" />
                                    </Player>
                                </div>
                                <div className="name-views">
                                    <h4>Baby</h4>
                                    <span>56,400,762 views * Jun 15, 2018</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3}>
                        
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default VideoDetails;