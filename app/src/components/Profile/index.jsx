/* eslint-disable react/forbid-prop-types */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./profile.css";
import { useAuth } from "../../AppProviders";

const Profile = (props) => {
  const { userId, onClose, cssOverride } = props;
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const { api } = useAuth();

  useEffect(async () => {
    const response = await api.getUserDetails(userId);
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
        <img className="profile-img" src={userProfileDetails.profileImgLargeUrl} alt={userProfileDetails.username} />
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

export const FloatingTogglableProfile = (props) => {
  const { userId, target, onClose } = props;

  if (userId === "") {
    return <></>;
  }

  const viewHeight = document.documentElement.clientHeight;
  const { top, right } = target;
  const position = {};

  if (top + 560 <= viewHeight) {
    // min height of profile TODO: calculate this better.
    position.top = top;
  } else {
    position.bottom = "3rem"; // height of footer
  }
  position.left = right;

  return <Profile userId={userId} onClose={onClose} cssOverride={position} />;
};

FloatingTogglableProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  cssOverride: PropTypes.object.isRequired
};

export default Profile;
