import React, { useState } from "react";
import { useAuth } from "../../AppProviders";
import Profile from "../Profile";

export const ChatList = ({ history }) => {
  const { api } = useAuth();

  const [selectedProfile, setSelectedProfile] = useState({});
  const [profileVisible, setProfileVisibility] = useState(false);
  const [profileCSSOverride, setProfileCSSOverride] = useState({});

  const toggleProfile = (e) => {
    const viewHeight = document.documentElement.clientHeight;
    const { top, right } = e.target.getBoundingClientRect();
    const position = {};

    if (top + 554 <= viewHeight) {
      // min height of profile. TODO: calculate this better
      position.top = top;
    } else {
      position.bottom = "3rem"; // height of footer
    }
    position.left = right;
    setProfileCSSOverride(position);
    setProfileVisibility(!profileVisible);
  };

  const messageElements = history.map((item, index) => {
    const [userId, username, encodedProfileImgUrl] = item.clientId.split(":");
    const profileImgUrl = decodeURIComponent(encodedProfileImgUrl);
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const toggleSpecificUserProfile = (e) => {
      setSelectedProfile(userId);
      toggleProfile(e);
    };

    return (
      <li key={userId} className="message">
        <button type="button" onClick={toggleSpecificUserProfile} className="message-button">
          <img className="message-thumbnail" src={profileImgUrl} alt={username} />
        </button>
        <button className="sender message-button" type="button" onClick={toggleSpecificUserProfile}>
          {username}
        </button>
        <span className="time">{messageTime}</span>
        <span className="text">{item.data.text}</span>
      </li>
    );
  });

  const profile = profileVisible ? (
    <Profile userId={selectedProfile} onClose={toggleProfile} cssOverride={profileCSSOverride} />
  ) : (
    <></>
  );

  return (
    <>
      {messageElements}
      {profile}
    </>
  );
};

export default ChatList;
