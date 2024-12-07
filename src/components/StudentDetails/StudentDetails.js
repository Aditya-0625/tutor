import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import defaultPic from "../../Assets/defaultpic.jpg"; // Ensure the path is correct
import "./studentdetails.css"; // Import CSS for styling

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const [student, setStudent] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function for routing

  // Sample student data (this would usually come from an API)
  const students = [
    {
      id: 1,
      student_name: "Aryan Patel",
      location: "Satellite, Ahmedabad",
      preferredTime: "Morning",
      classInfo: "ICSE 9th",
      tuitionId: "823100",
      subjects: "Maths and Science",
      description: "Looking for a tutor for ICSE 9th, Maths and Science.",
      email: "aryan@example.com",
      phone: "+91 9876543210",
      parentContact: "Mr. Patel",
    },
    {
      id: 2,
      student_name: "Nikita Mehta",
      location: "Maninagar, Ahmedabad",
      preferredTime: "Evening",
      classInfo: "CBSE 6th",
      tuitionId: "823105",
      subjects: "English and History",
      description: "Need a tutor for CBSE 6th, English and History.",
      email: "nikita@example.com",
      phone: "+91 9123456789",
      parentContact: "Mr. Mehta",
    },
  ];

  // Find the student by ID
  useEffect(() => {
    const studentData = students.find((student) => student.id === parseInt(id));
    setStudent(studentData);
  }, [id]);

  if (!student) return <p>Loading...</p>; // Show loading until student data is fetched

  const handleLoginRedirect = () => {
    navigate("/student-login"); // Redirect to the student login page
  };

  return (
    <div className="student-details-container">
      <h1>{student.student_name}'s Full Details</h1>
      <div className="student-details">
        <img src={defaultPic} alt="Student" className="student-photo" />
        <div className="student-info">
          <p><strong>Location:</strong> {student.location}</p>
          <p><strong>Preferred Time:</strong> {student.preferredTime}</p>
          <p><strong>Class Info:</strong> {student.classInfo}</p>
          <p><strong>Tuition ID:</strong> {student.tuitionId}</p>
          <p><strong>Subjects:</strong> {student.subjects}</p>
          <p><strong>Description:</strong> {student.description}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Parent Contact:</strong> {student.parentContact}</p>
        </div>
      </div>

      <div className="login-button-container">
        <button className="login-button" onClick={handleLoginRedirect}>
          Login
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
