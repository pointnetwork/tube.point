import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "wouter";
// import { Button } from "react-bootstrap";
import logo from '../assets/images/pointlogowhite.png';
import '../assets/styles/Header.css';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="header-navbar">
    <Container>
      <img src={logo} className="imgLogo" alt="Point Tube" />
      <Link to='/'>
        <Navbar.Brand href="/">Point Drive</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link to="/">
            <Nav.Link href="/">
              Home
            </Nav.Link>
          </Link>
          <Link to="/my-videos">
            <Nav.Link href="/my-videos">
              My Videos
            </Nav.Link>
          </Link>
          <Link to="/upload">
            <Nav.Link href="/upload">
              Upload
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  );
};

export default Header;
