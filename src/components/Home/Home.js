import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import { db } from "../../firebase/firebase";
import { ref, push, set } from "firebase/database";

function Home() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const saveToFirebase = async (data) => {
    try {
      const usersRef = ref(db, "users");
      const newUserRef = push(usersRef);
      await set(newUserRef, { ...data, id: newUserRef.key });
      console.log("Data successfully saved to Firebase.");
    } catch (error) {
      console.error("Error saving data to Firebase:", error);
    }
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />

        {/* Home Content */}
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                <span style={{ color: "white" }}>EduNest</span>
                <span className="wave" role="img" aria-labelledby="wave">
                  📖
                </span>
              </h1>

              <h3 className="heading-name">
                <strong className="main-name">
                  Unlock the power of personalized Learning at Your doorstep!
                  Learning made easy: One-on-One at Home Where education meets
                  Comfort, and personalized learning thrives.
                </strong>
              </h3>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>

      <Home2 />
    </section>
  );
}

export default Home;
