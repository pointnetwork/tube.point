import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "wouter";
import { Button } from "react-bootstrap";

import '../assets/styles/Header.css'

const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="header-navbar">
        <Container>
            <Link to="/">
                <Navbar.Brand href="/">Tube point</Navbar.Brand>
            </Link>
            <div className="header-btn-group">
                <Link to="/my-videos" className="main-btn-1">
                    My Videos
                </Link>
                <Link to="/upload" className="main-btn-2">
                    Uploads
                </Link>
            </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
