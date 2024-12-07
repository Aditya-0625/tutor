import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function BlogPage() {
  return (
    <Container className="my-5" style={{ color: "white" }}>
      <h1>Welcome to Our Blog</h1>
      <p>
        Home tuition and online tutoring are becoming increasingly popular for
        students of all ages. The flexibility and personalized attention that
        these methods offer make them an ideal choice for those looking to
        improve their academic performance or gain new skills.
      </p>
      <h3>Benefits of Home Tuition:</h3>
      <ul>
        <li>Personalized learning pace and style</li>
        <li>Convenience and flexibility in scheduling</li>
        <li>One-on-one attention from the tutor</li>
        <li>Focus on areas of improvement and weak subjects</li>
      </ul>

      <h3>Why Choose Online Tutoring?</h3>
      <ul>
        <li>Learn from the comfort of your home</li>
        <li>Access to tutors from anywhere in the world</li>
        <li>Affordable options for various subjects</li>
        <li>Convenient video lessons and interactive tools</li>
      </ul>

      <p>
        Whether you're looking for help with homework, exam preparation, or
        improving specific skills, home tuition and online tutoring can be a
        great solution. Connect with experienced tutors and take your learning
        to the next level.
      </p>

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </Container>
  );
}

export default BlogPage;