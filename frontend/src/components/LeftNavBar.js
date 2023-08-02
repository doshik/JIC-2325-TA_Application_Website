import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import "./LeftNavBar.css";

function LeftNavBar() {
  const location = useLocation();
  const role = useSelector((state) => state.auth.user ? state.auth.user.accountType : "");
  const profilePictureKey = useSelector((state) => state.auth.user ? state.auth.user.profile_picture_key : "");
  const initialProfilePicture = `/application/file/download/${profilePictureKey}`;
  const [profilePicture, setProfilePicture] = React.useState(initialProfilePicture);
  const imageInputRef = React.useRef();
  const token = useSelector((state) => state.auth.token);

  // Use useEffect to listen for changes in profilePictureKey and update profilePicture
  React.useEffect(() => {
    setProfilePicture(`/application/file/download/${profilePictureKey}`);
  }, [profilePictureKey]);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/user/upload-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        // Immediately set the new profile picture
        setProfilePicture(URL.createObjectURL(file));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // A helper function to reduce repeated code
  const renderNavItem = (href, text) => (
    <Nav.Item>
      <Nav.Link
        className="leftNavLink"
        href={href}
        active={location.pathname === href}
      >
        {text}
      </Nav.Link>
    </Nav.Item>
  );

  return (
    <Nav className="leftNavBar d-none d-md-block col-md-3 col-lg-2">
      {role === "student" && (
        <div style={{ textAlign: 'center', marginBottom: '1em' }}>
          <input
            type="file"
            ref={imageInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          {profilePicture ?
            <img
              src={profilePicture}
              alt="Profile"
              style={{ width: '64px', height: '64px', cursor: 'pointer', borderRadius: '50%' }}
              onClick={handleImageClick}
            /> :
            <FontAwesomeIcon
              icon={faUserCircle}
              size='3x'
              style={{ cursor: 'pointer' }}
              onClick={handleImageClick}
            />
          }
        </div>
      )}
      {(role !== "student" && role !== "professor" && role !== "TA") && (
        <div>
          {renderNavItem("/login", "Welcome")}
          {renderNavItem("/FAQs", "FAQs")}
        </div>
      )}
      {role === "student" && (
        <div>
          {renderNavItem("/home", "Home")}
          {renderNavItem("/dashboard", "Dashboard")}
          {renderNavItem("/apply", "Open Applications")}
          {renderNavItem("/interviews", "Interview Scheduling")}
          {renderNavItem("/FAQs", "FAQs")}
        </div>
      )}
      {(role === "professor" || role === "TA") && (
        <div>
          {renderNavItem("/home", "Home")}
          {renderNavItem("/dashboard", "Dashboard")}
          {renderNavItem("/templates", "Application Templates")}
          {renderNavItem("/interviewscheduling", "Interview Scheduling")}
        </div>
      )}
    </Nav>
  );
}

export default LeftNavBar;
