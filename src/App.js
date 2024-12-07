import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Jointutor from "./components/JoinasTutor/JoinasTutor";
import Joinstudent from "./components/JoinasStudents/JoinasStudent";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import TutorLogin from "./components/TutorLogin/TutorLogin";
import Findtutor from "./components/FindTutor/FindTutor";
import Findstudent from "./components/FindStudent/FindStudent";
import TutorDetails from "./components/TutorDetails/TutorDetails";
import StudentDetails from "./components/StudentDetails/StudentDetails";
import BlogPage from "./components/BlogPage/BlogPage";
import ContactUs from "./components/ContactUs/ContactUs"; // Imported ContactUs
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/JoinasTutor" element={<Jointutor />} />
          <Route path="/JoinasStudent" element={<Joinstudent />} />
          <Route path="/FindTutor" element={<Findtutor/>}/>
          <Route path="/FindStudent" element={<Findstudent />} />
          <Route path="/tutor-details/:id" element={<TutorDetails />} />
          <Route path="/student-details/:id" element={<StudentDetails />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/tutor-login" element={<TutorLogin />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/tutordetails/:tutorId" element={<TutorDetails />} />
          <Route path="/contactus" element={<ContactUs />} /> {/* New Contact Us route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
