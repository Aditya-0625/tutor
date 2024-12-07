import React, { useState } from "react";
import "./StudentLogin.css"; // Optional: Add custom CSS for styling
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth imports
import { app } from "../../firebase/firebase"; // Ensure correct path to your Firebase config

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    setError("");

    const auth = getAuth(app); // Get Firebase Auth instance

    // Firebase login with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log("Login Successful:", user);
        alert("Login Successful!");
      })
      .catch((error) => {
        // Handle login errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login Error:", errorCode, errorMessage);
        setError("Invalid email or password.");
      });
  };

  return (
    <div className="student-login-container">
      <h2 className="text-center">Student Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
}

export default StudentLogin;
