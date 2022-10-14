import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import logo from '../assets/images/pointlogowhite.png';
import '../assets/styles/Header.css';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="header-navbar">
    <Container>
      <img src={logo} className="imgLogo" alt="Point Tube" />
      <LinkContainer to='/'>
        <Navbar.Brand href="/">Point Drive</Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" activeKey="">
          <LinkContainer to="/">
            <Nav.Link href="/">
              Home
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/my-videos">
            <Nav.Link href="/my-videos">
              My Videos
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/upload">
            <Nav.Link href="/upload">
              Upload
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  );
};

export default Header;
