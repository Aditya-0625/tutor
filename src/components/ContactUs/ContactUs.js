import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../Navbar"; // Assuming the Navbar component is in this path
import "./ContactUs.css"; // Custom CSS for styling
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

function ContactUs() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, such as sending the data to an API or database
    alert("Message submitted successfully!");
    // Reset the form
    setFormData({
      name: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      <Container fluid className="contact-us-section">
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <h1 className="contact-title">
                CONTACT <span className="purple">US</span>
              </h1>
              <p className="contact-subtitle">
                Please fill out the form below to get in touch with us.
              </p>
            </Col>
          </Row>

          {/* Contact Form */}
          <Row className="justify-content-center mt-4">
            <Col md={6}><div className="contact-item">
              <AiFillMail className="contact-icon" />
              <p>Email: edunest24@gmail.com</p>
            </div>
            <div className="contact-item">
              <AiFillPhone className="contact-icon" />
              <p>Phone: +91 7349400222</p>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <p>Location: Vidya Nagar BVB college, Hubli 580008
              </p>
            </div>
              <h2 className="contact-form-title">Send Us a Message</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4 contact-submit-btn">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Footer at the bottom */}
    </>
  );
}

export default ContactUs;