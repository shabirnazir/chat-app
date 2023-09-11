import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import css from "./Navbar.module.css";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import SignUpForm from "../../Forms/LoginForm/SignUpForm/SignUpForm";
import ProfileUser from "../ProfileUser/ProfileUser";

function NavbarContainer() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    //check local storage for user info
    const userInfo = localStorage.getItem("UserInfo");
    if (userInfo) {
      //set user info in redux
      setUser(JSON.parse(userInfo));
    }
  }, [showLogin, showSignup]);
  const handleLogin = (state) => {
    setShowLogin(state);
  };
  const handleSignup = (state) => {
    setShowSignup(state);
  };
  const handleLogout = () => {
    //remove user info from local storage
    localStorage.removeItem("UserInfo");
    //set user info in redux
    setUser(null);
  };
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
          </Nav>
          <Nav className="end">
            {user ? null : (
              <>
                <Nav.Link onClick={() => setShowSignup(true)}>Sign Up</Nav.Link>
                <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
              </>
            )}
            {user?.name ? (
              <Nav.Link>
                <ProfileUser user={user} handleLogout={handleLogout} />
              </Nav.Link>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
      <Modal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleLogin={handleLogin} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogin(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSignup}
        onHide={() => setShowSignup(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm handleSignup={handleSignup} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarContainer;
