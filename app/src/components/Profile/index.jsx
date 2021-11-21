import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./profile.css";
import { useAuth } from "../../AppProviders";

const Profile = (props) => {
  const { userId, onClose, cssOverride } = props;
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const { api } = useAuth();

  useEffect(async () => {
    const response = await api.getUserProfile(userId);
    setUserProfileDetails(response);
  }, [userId]);

  return (
    <div className="profile-holder">
      <button type="button" onClick={onClose} className="close">
        close
      </button>
        <header className="authed profile-header">
          <h2 className="profile-header">{userProfileDetails.username}</h2>
        </header>
      <div className="profile" style={cssOverride}>
        <img className="profile-img" src={userProfileDetails.profileImgUrl} alt={userProfileDetails.username} />
        <h2 className="profile-title">{userProfileDetails.username}</h2>
        <p className="profile-subtitle">
          {userProfileDetails.firstName} {userProfileDetails.lastName}
        </p>
        <div className="profile-buttons">
          <button className="profile-button" type="button">
            Message
          </button>
          <button className="profile-button" type="button">
            Other action
          </button>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Profile;
