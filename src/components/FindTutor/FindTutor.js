import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, storage } from '../../firebase/firebase';
import { listAll, getDownloadURL, ref as sRef } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import './findtutor.css';
import defaultPic from '../../Assets/defaultpic.jpg';

const Findtutor = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // For error handling
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true); // Start loading

      try {
        const tutorsRef = ref(db, 'tutors'); // Reference to 'tutors' node
        onValue(tutorsRef, async (snapshot) => {
          const data = snapshot.val(); // Get the snapshot of data

          if (data) {
            const tutorsList = await Promise.all(
              Object.keys(data).map(async (key) => {
                const tutorData = { id: key, ...data[key] };
                
                try {
                  const folderRef = sRef(storage, `tutor_photos/${tutorData.id}/`);
                  const fileList = await listAll(folderRef);
                  const photoURL =
                    fileList.items.length > 0
                      ? await getDownloadURL(fileList.items[0]) // Get tutor photo URL
                      : defaultPic;
                  return { ...tutorData, photoURL }; // Return updated tutor data
                } catch (error) {
                  console.error(`Error fetching photo for tutor ${tutorData.tutor_name}:`, error);
                  return { ...tutorData, photoURL: defaultPic }; // Default image on error
                }
              })
            );
            setTutors(tutorsList); // Update tutors state
          } else {
            setTutors([]); // Set empty list if no tutors
          }
        });
      } catch (error) {
        console.error('Error fetching tutors:', error);
        setError('Failed to fetch tutors.'); // Handle error
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchTutors();
  }, []);

  const viewTutorDetails = (tutorId) => {
    navigate(`/tutordetails/${tutorId}`);
  };

  return (
    <div className="tutors-container">
      <h1>Find Tutors</h1>
      
      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading State */}
      {loading && <p>Loading tutors...</p>}

      {/* Tutors Grid */}
      <div className="tutors-grid">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div key={tutor.id} className="tutor-card">
              <div className="tutor-card-header">
                <p><strong>Posted On:</strong> {new Date(tutor.timestamp).toLocaleDateString()}</p>
              </div>
              <div className="tutor-card-body">
                <img
                  src={tutor.photoURL || defaultPic}
                  alt={`${tutor.tutor_name}'s profile`}
                  className="tutor-photo"
                />
                <p><strong>Name:</strong> {tutor.tutor_name}</p>
                <p><strong>Education:</strong> {tutor.education || 'N/A'}</p>
                <p><strong>Gender:</strong> {tutor.gender || 'N/A'}</p>
                <p><strong>Subject:</strong> {tutor.subject || 'N/A'}</p>
                <p>
                  <strong>Classes:</strong> {Array.isArray(tutor.ccategory) ? tutor.ccategory.join(', ') : 'N/A'}
                </p>
                <p>
                  <strong>Location:</strong> {Array.isArray(tutor.additionalOptions) ? tutor.additionalOptions.join(', ') : 'N/A'}
                </p>
              </div>
              <div className="tutor-card-footer">
                <button className="apply-button" onClick={() => navigate('/joinstudent')}>Apply</button>
                <button className="view-details-button" onClick={() => viewTutorDetails(tutor.id)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tutors found or loading error.</p>
        )}
      </div>
    </div>
  );
};

export default Findtutor;
