import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "wouter";
import { Button } from "react-bootstrap";
import Logo from '../assets/images/pointlogowhite.png';

import '../assets/styles/Header.css'

const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="header-navbar">
        <Container>
                <Navbar.Brand href="/" className="d-flex align-items-center"><img src={Logo} alt="logo" className="img-fluid me-2" />Tube point</Navbar.Brand>
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
