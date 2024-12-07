import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import { db } from "../../firebase/firebase";
import { ref, push, set } from "firebase/database";

function Home2() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messagesRef = ref(db, "messages");
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, formData);
      console.log("Message saved to Firebase successfully!");

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", message: "" });
      }, 3000); // Reset form and hide success message after 3 seconds
    } catch (error) {
      console.error("Error saving message to Firebase:", error);
    }
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        {/* About Section */}
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              <span className="purple">Who We Are</span>
            </h1>
            <p className="home-about-body">
              Your partner in learning and growth. We are a team of creative
              minds committed to providing the best resources and guidance for
              your educational journey. Our goal is to make learning a
              delightful and enriching experience, covering a wide range of
              subjects from science to art.
              <br />
              <br />
              We're here to help you unlock your potential and achieve your
              goals!
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>

        {/* Why Choose Us Section */}
        <Row className="mt-5">
          <Col md={12} className="text-center">
            <h1>
              <span className="purple">Why HomeTutorSite.com?</span>
            </h1>
          </Col>
          <Col md={6} className="mt-4">
            <h3 className="text-white">HomeTutorSite</h3>
            <ul className="text-white">
              <li>
                <strong>Low Charges:</strong> No commission on monthly tuition
                fees.
              </li>
              <li>
                <strong>Fast & Reliable:</strong> Tutors receive 100% of the
                fees.
              </li>
              <li>
                <strong>Customer Service:</strong> 25+ members providing daily
                support.
              </li>
              <li>
                <strong>Refund Policy:</strong> Best-in-class 100% money-back
                guarantee.
              </li>
            </ul>
          </Col>
          <Col md={6} className="mt-4">
            <h3 className="text-white">Local Tuition Agencies</h3>
            <ul className="text-white">
              <li>
                <strong>High Charges:</strong> 50% of the first month and
                20-30% monthly fees.
              </li>
              <li>
                <strong>Slow & Unreliable:</strong> Limited tutors and slow
                processes.
              </li>
              <li>
                <strong>Limited Support:</strong> Often managed by a single
                person.
              </li>
              <li>
                <strong>No Refunds:</strong> Refunds are not entertained.
              </li>
            </ul>
          </Col>
        </Row>

        {/* Contact Us Section */}
        <Row>
          <Col md={12} className="home-about-social text-center">
            <h1>CONTACT US</h1>
            <p>
              Feel free to <span className="purple">connect</span> with us.
            </p>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row className="justify-content-center">
          <Col md={6} className="contact-box">
            <h2>Contact Information</h2>
            <div className="contact-item">
              <AiFillMail className="contact-icon" />
              <p>Email: edunest24@gmail.com</p>
            </div>
            <div className="contact-item">
              <AiFillPhone className="contact-icon" />
              <p>Phone: +91 7349400222</p>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <p>Location: Your Location Address</p>
            </div>

            <h2>Send Us a Message</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Your Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage" className="mt-3">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message here"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-4">
                Submit
              </Button>
            </Form>
            {isSubmitted && (
              <div className="success-message mt-3">
                <p>Your message has been submitted successfully!</p>
              </div>
            )}
          </Col>
        </Row>

        {/* Categories Section */}
        <Row className="mt-5 categories-section">
          {[
            {
              title: "Tuitions By City",
              items: [
                "Mumbai",
                "Delhi",
                "Bangalore",
                "Hyderabad",
                "Ahmedabad",
                "Chennai",
                "Kolkata",
                "Surat",
              ],
            },
            {
              title: "Tuitions By Category",
              items: [
                "Nursery/Preschool",
                "School",
                "Class XI - XII",
                "Arts",
                "Science",
                "Engineering & Technology",
                "Accounting & Commerce",
                "Computer/IT Courses",
              ],
            },
            {
              title: "Tuitions By Course",
              items: [
                "Nursery Level",
                "Kindergarten",
                "Class I",
                "Class II",
                "Class III",
                "Class IV",
                "Class V",
                "Class VI",
              ],
            },
            {
              title: "Tuitions By Subject",
              items: [
                "Maths",
                "Physics",
                "Chemistry",
                "English",
                "Computers",
                "Biology",
                "Accounting",
                "Economics",
              ],
            },
          ].map((category, index) => (
            <Col md={3} key={index}>
              <h3 className="category-title text-white">{category.title}</h3>
              <ul className="text-white">
                {category.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
