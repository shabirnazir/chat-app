import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import css from "./Navbar.module.css";
function NavbarContainer() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" className={css.link}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/signup" className={css.link}>
                Sign Up
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/login" className={css.link}>
                Login
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarContainer;
