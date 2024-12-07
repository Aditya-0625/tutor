import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase/firebase"; // Firebase config
import "./findstudent.css";
import uploadedImage from "../../Assets/undefined.png"; // Replace with the correct path to your image

const FindStudent = () => {
  const navigate = useNavigate();

  const [studentsData, setStudentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search input
  const [filteredStudents, setFilteredStudents] = useState([]); // State to track filtered students

  useEffect(() => {
    const studentsRef = ref(db, "students"); // reference to students node in Firebase
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudentsData(studentsList);
        setFilteredStudents(studentsList); // Set the initial filtered list
      }
    });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = studentsData.filter((student) =>
      student.location.toLowerCase().includes(value)
    );

    setFilteredStudents(filtered);
  };

  const handleViewDetails = (id) => {
    navigate(`/student-details/${id}`);
  };

  const handleApply = (id) => {
    navigate(`/apply/student/${id}`);
  };

  return (
    <div className="students-page">
    

      {/* Main container */}
      <div className="students-container">
        <h1 className="students-header">Find Students for Tutoring</h1>
        <p className="students-subheader">Explore part-time home tutoring opportunities.</p>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Student Cards */}
        <div className="students-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-info">
                  <h3 className="student-title">Looking for Tutor</h3>
                  <p><strong>Location:</strong> {student.location}</p>
                </div>
                <div className="student-details">
                  <p><strong>Preferred Time:</strong> {student.preferredTime}</p>
                  <p><strong>Class:</strong> {student.classInfo}</p>
                  <p><strong>Subjects:</strong> {student.subjects}</p>
                  <p><strong>Tuition ID:</strong> {student.tuitionId}</p>
                </div>
                <div>
                  <p><strong>Description:</strong> {student.description}</p>
                </div>
                <div className="student-card-footer">
                  <button
                    className="action-button view-details"
                    onClick={() => handleViewDetails(student.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="action-button apply"
                    onClick={() => handleApply(student.id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No students found for your search.</p>
          )}
        </div>
      </div>
        {/* Image placed outside the main container */}
        <div className="image-container">
        <img
          src={uploadedImage}
          alt="Tutoring illustration"
          className="page-image"
        />
      </div>
    </div>
  );
};

export default FindStudent;
