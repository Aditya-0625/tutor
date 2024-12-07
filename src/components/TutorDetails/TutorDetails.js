import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import './tutordetails.css';

const TutorDetails = () => {
  const { tutorId } = useParams(); // Get tutorId from URL
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      const tutorRef = ref(db, `tutors/${tutorId}`);
      const snapshot = await get(tutorRef);
      if (snapshot.exists()) {
        setTutor(snapshot.val());
      } else {
        console.error('Tutor not found');
      }
    };

    fetchTutorDetails();
  }, [tutorId]);

  return (
    <div className="tutor-details-container">
      {tutor ? (
        <>
          <h1>{tutor.tutor_name}</h1>
          <p><strong>Education:</strong> {tutor.education}</p>
          <p><strong>Gender:</strong> {tutor.gender}</p>
          <p><strong>Subject:</strong> {tutor.subject}</p>
          <p><strong>Classes:</strong> {Array.isArray(tutor.ccategory) ? tutor.ccategory.join(', ') : 'N/A'}</p>
          <p><strong>Location:</strong> {Array.isArray(tutor.additionalOptions) ? tutor.additionalOptions.join(', ') : 'N/A'}</p>
          <p><strong>Contact:</strong> {tutor.phone || 'N/A'}</p>
          <p><strong>Email:</strong> {tutor.email || 'N/A'}</p>
        </>
      ) : (
        <p>Loading tutor details...</p>
      )}
    </div>
  );
};

export default TutorDetails;
