import React, { useState } from 'react';
import './joinastutor.css';
import { Row, Col } from "react-bootstrap";
import { ref, set } from 'firebase/database';
import { uploadBytes, ref as sRef, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';
import uploadedImage from '../../Assets/undefined (1).png'; // Corrected path

const Jointutor = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    tutor_name: '',
    email: '',
    education: '',
    contact: '',
    gender: '',
    subject: '',
    ccategory: [],
    location: '',
    additionalOptions: [],
    charge: '', // New charge field
    password: '',
    confirmPassword: '',
    photo: null,
  });

  const locationOptions = {
    Hubballi: ['OldHubballi', 'Vidyanagar', 'Keshwapur', 'Gokul road', 'Unkal', 'SaiNagar', 'Lingaraj Nagar', 'Akshay Park', 'Akshay Colony', 'Manjunath Nagar', 'Deshpande Nagar', 'Navanagar'],
    Dharwad: ['Malamaddi', 'Kalyan Nagar', 'Shivagiri', 'CBNagar', 'Saptapur', 'RaniChennamma Nagar', 'SaiNagar', 'Sampige Nagar', 'ShriNagar', 'Basava Nagar', 'Navoday Nagar', 'Nisarga Layout', 'Madihal', 'Mrutyunjay Nagar'],
    Gadag: ['Mulgund Naka', 'Hatalgeri Naka', 'Sambapur Road', 'Hudko Colony', 'Puttaraj Nagar', 'Mudhol'],
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const { name } = e.target;
    setFormData((prevFormData) => {
      const updatedOptions = checked
        ? [...prevFormData[name], value]
        : prevFormData[name].filter((item) => item !== value);

      return {
        ...prevFormData,
        [name]: updatedOptions,
      };
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      additionalOptions: [], // Reset additional options when location changes
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      // Upload the photo to Firebase Storage
      let photoURL = '';
      if (formData.photo) {
        const photoRef = sRef(storage, `tutor_photos/${formData.tutor_name}_${Date.now()}`);
        await uploadBytes(photoRef, formData.photo);
        photoURL = await getDownloadURL(photoRef); // Get the URL of the uploaded photo
      }

      // Save tutor data to Firebase Realtime Database
      const tutorRef = ref(db, 'tutors/' + formData.email.replace(/\./g, '_'));
      await set(tutorRef, {
        tutor_name: formData.tutor_name,
        email: formData.email,
        education: formData.education,
        contact: formData.contact,
        gender: formData.gender,
        subject: formData.subject,
        ccategory: formData.ccategory,
        location: formData.location,
        additionalOptions: formData.additionalOptions,
        charge: formData.charge,
        photoURL: photoURL || '', // Save the photo URL (or empty string if no photo)
      });

      alert('Tutor registration successful!');
    } catch (error) {
      console.error("Error registering tutor:", error);
      alert("Failed to register tutor.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={`navbar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {/* Add your navbar content here */}
      </nav>

      {/* Main Content */}
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          gap: "20px",
          minHeight: "100vh",
          backgroundColor: "white", // Page background color
          marginTop: "120px", // Adjust based on your navbar height
        }}
      >
        {/* Image Section */}
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <img src={uploadedImage} alt="Tutor illustration" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
        </div>

        {/* Form Section */}
        <div
          className="form-wrapper"
          style={{
            flex: 3,
            padding: "20px",
            backgroundColor: "#E6E6FA", // Light purple with a hint of lilac
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "900px",
            marginTop: "20px",
            height: "auto",
          }}
        >
          <h1>Registration as Tutor</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" name="tutor_name" value={formData.tutor_name} onChange={handleInputChange} required />
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
            <input type="text" placeholder="Education" name="education" value={formData.education} onChange={handleInputChange} required />
            <input type="text" placeholder="Contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
            <select name="gender" value={formData.gender} onChange={handleSelectChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            <input type="text" placeholder="Subject" name="subject" value={formData.subject} onChange={handleInputChange} required />

            <input
              type="number"
              placeholder="Charge (₹)"
              name="charge"
              value={formData.charge}
              onChange={handleInputChange}
              style={{
                width: '97.5%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '13px',
              }}
              required
            />
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />
            <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
            <div>
              <p>Classes interested to teach:</p>
              <label><input type="checkbox" name="ccategory" value="primary" checked={formData.ccategory.includes('primary')} onChange={handleCheckboxChange} /> Primary School</label>
              <label><input type="checkbox" name="ccategory" value="highschool" checked={formData.ccategory.includes('highschool')} onChange={handleCheckboxChange} /> High School</label>
              <label><input type="checkbox" name="ccategory" value="college" checked={formData.ccategory.includes('college')} onChange={handleCheckboxChange} /> College</label>
            </div>
            <select name="location" value={formData.location} onChange={handleSelectChange} required>
              <option value="">Select a Location</option>
              <option value="Hubballi">Hubballi</option>
              <option value="Dharwad">Dharwad</option>
              <option value="Gadag">Gadag</option>
            </select>
            {formData.location && locationOptions[formData.location] && (
              <div>
                <p>Additional Options for {formData.location}:</p>
                {locationOptions[formData.location].map((option) => (
                  <label key={option}>
                    <input type="checkbox" name="additionalOptions" value={option} checked={formData.additionalOptions.includes(option)} onChange={handleCheckboxChange} /> {option}
                  </label>
                ))}
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit" className="joinbutton">Join as Tutor</button>
          </form>
        </div>
      </div>

      {/* Tuition Categories Section */}
      <div className="container mt-5">
        <Row className="categories-section">
          {[ 
            {
              title: "Tuitions By City",
              items: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat"],
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
              items: ["Nursery Level", "Kindergarten", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI"],
            },
            {
              title: "Tuitions By Subject",
              items: ["Maths", "Physics", "Chemistry", "English", "Computers", "Biology", "Accounting", "Economics"],
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
      </div>
    </div>
  );
};

export default Jointutor;
