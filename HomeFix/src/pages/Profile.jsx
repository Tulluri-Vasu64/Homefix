
import React, { useState } from "react";
import "../styles/Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("homefixUser"));

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h1>My Profile</h1>

        <div className="profile-image-section">

          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="profile-placeholder">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <label htmlFor="profileImage" className="upload-button">
            Change Photo
          </label>

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </div>

        <div className="profile-details">

          <div className="profile-item">
            <strong>Name</strong>
            <span>{user?.name || "User"}</span>
          </div>

          <div className="profile-item">
            <strong>Email</strong>
            <span>{user?.email || "No email"}</span>
          </div>

          <div className="profile-item">
            <strong>Role</strong>
            <span>User</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;
