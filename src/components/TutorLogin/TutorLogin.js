import React, { useState } from "react";
import "./TutorLogin.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase";

function TutorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Attempting to log in with:", email, password); // Debugging

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format.");
      return;
    }

    setError(""); // Clear errors

    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login Successful:", user);
        alert("Tutor Login Successful!");
      })
      .catch((error) => {
        console.error("Login Error Details:", error.code, error.message); // Debugging
        setError("Invalid email or password.");
      });
  };

  return (
    <div className="tutor-login-container">
      <h2 className="text-center">Tutor Login</h2>
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
        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
      </form>
    </div>
  );
}

export default TutorLogin;
