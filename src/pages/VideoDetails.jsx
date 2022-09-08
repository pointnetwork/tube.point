import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScissors, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const VideoDetails = ({name}) => {
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
                                    <h4 className="name">Baby</h4>
                                    <div className="views-social-icons d-flex justify-content-between align-items-center">
                                        <span className="views">56,400,762 views * Jun 15, 2018</span>
                                        <div className="social-icons d-flex">
                                            <div className="icon d-flex align-items-center me-3">
                                                <FontAwesomeIcon className="me-1" icon={faThumbsUp} /> <span>55K</span>
                                            </div>
                                            <div className="icon d-flex align-items-center me-3">
                                                <FontAwesomeIcon className="me-1" icon={faThumbsDown} /> <span>Dislike</span>
                                            </div>
                                            <div className="icon d-flex align-items-center me-3">
                                                <FontAwesomeIcon className="me-1" icon={faShare} /> <span>Share</span>
                                            </div>
                                            <div className="icon d-flex align-items-center">
                                                <FontAwesomeIcon className="me-1" icon={faScissors} /> <span>Clip</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="address-description">
                                    <div className="address">
                                        <p className="mb-2">0x ... 048</p>
                                    </div>
                                    <div className="description">
                                        <p>In this episode of CriComedy we shall cover the Asia Cup 2022 t20 clash between Pakistan and Afghanistan that Pakistan won in the last over by a brilliant cameo by Naseem Shah. </p>
                                    </div>
                                </div>
                                
                            </div>
                        </Col>
                        <Col lg={3}>
                        <div className="comment-container">
                                    
                                    <div className="show-comments">
                                        <div className="comment">
                                            <p className="address">0x ... 048</p>
                                            <p className="comment-details">The shuffling of the batting order shouldn't be criticized, rather it should be appreciated. sending in Shadab today as he plays well against the spinners of Afghanistan, and sending in Nawaz against India as a left hander was needed at that stage of the game. Both times it worked out and these are the small decisions that make the smallest of differences.</p>
                                        </div>
                                        <div className="comment">
                                            <p className="address">0x ... 048</p>
                                            <p className="comment-details">No doubt....this is the best asia cup so far....every match is nail bitters.and better than before...atleast we have something to watch for 3 hours....interestly in this asia cup.....</p>
                                        </div>
                                        <div className="comment">
                                            <p className="address">0x ... 048</p>
                                            <p className="comment-details">What Afghanistan did was really shameful. But Naseem shah took the perfect revenge! 😁 And Hassan ali's celebration was really cute. He showed that we are a TEAM! ❤️</p>
                                        </div>
                                        <div className="comment">
                                            <p className="address">0x ... 048</p>
                                            <p className="comment-details">Many many Congratulations From 158th Ranking in 2020 to World's No 1, Muhammad Rizwan Becomes Best T20 Batsman❤️🔥</p>
                                        </div>
                                    </div>

                                    <form>
                                        <div className="add-a-comment">
                                            <input type="text" placeholder="Add a comment..." className="w-100" />
                                        </div>
                                        <div className="text-end pt-2">
                                            <Button variant="light" className="me-2">Cancel</Button>
                                            <Button variant="success">Comment</Button>
                                        </div>
                                    </form>
                                </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default VideoDetails;