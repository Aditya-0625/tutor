import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle scroll behavior for navbar color
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  // Modal toggle functions
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  window.addEventListener("scroll", scrollHandler);

  return (
    <>
      <Navbar
        expanded={expand}
        fixed="top"
        expand="md"
        className={navColour ? "sticky" : "navbar"}
      >
        <Container>
          <Navbar.Brand href="/" className="d-flex">
            <img src={logo} className="img-fluid logo" alt="brand" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => {
              updateExpanded(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home">
              {/* Home */}
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                </Nav.Link>
              </Nav.Item>

              {/* Find Tutor */}
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/Findtutor"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> FindTutor
                </Nav.Link>
              </Nav.Item>

              {/* Find Student */}
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/Findstudent"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> FindStudent
                </Nav.Link>
              </Nav.Item>

              {/* Join as Students */}
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/JoinasStudent"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineFundProjectionScreen
                    style={{ marginBottom: "2px" }}
                  />{" "}
                  JoinasStudents
                </Nav.Link>
              </Nav.Item>

              {/* Join as Tutor */}
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/JoinasTutor"
                  onClick={() => updateExpanded(false)}
                >
                  <CgFileDocument style={{ marginBottom: "2px" }} /> JoinasTutor
                </Nav.Link>
              </Nav.Item>

              {/* More Button */}
              <Dropdown>
              <Dropdown.Toggle
        as={Nav.Link}
        className="text-white"
        id="dropdown-basic"
        style={{ display: "flex", alignItems: "center", gap: "5px",   marginTop: "3px",}}
      >
        <CgFileDocument style={{ marginBottom: "2px" }} /> More
      </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* Blog Link */}
                  <Dropdown.Item
                    as={Link}
                    to="/blog"
                    onClick={() => updateExpanded(false)}
                    className="dropdown-item-style" // Custom class for styling
                  >
                    Blog
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/contactus" onClick={() => updateExpanded(false)}>
                  Contact Us
                  </Dropdown.Item>

                  <Dropdown.Item as={Link} to="/aboutus">
                    About Us
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Login */}
              <Nav.Item>
                <Nav.Link onClick={handleShow}>
                  <AiFillStar style={{ marginBottom: "2px" }} /> Login
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Login Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please choose how you'd like to log in:</p>
          <div className="d-flex justify-content-around mt-3">
            <Button
              variant="primary"
              as={Link}
              to="/student-login"
              onClick={handleClose}
            >
              Student Login
            </Button>
            <Button
              variant="success"
              as={Link}
              to="/tutor-login"
              onClick={handleClose}
            >
              Tutor Login
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;