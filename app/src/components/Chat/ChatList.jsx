import React, { useState } from "react";
import Profile from "../Profile";

export const ChatList = ({ history }) => {
  const [profileVisible, setProfileVisibility] = useState(false);
  const [profileCSSOverride, setProfileCSSOverride] = useState({});

  const toggleProfile = (e) => {
    const viewHeight = document.documentElement.clientHeight;
    const { top, right } = e.target.getBoundingClientRect();
    const position = {};

    if (top + 480 <= viewHeight) {
      position.top = top;
    } else {
      position.bottom = "3rem";
    }
    position.left = right;
    setProfileCSSOverride(position);
    setProfileVisibility(!profileVisible);
  };

  const messageElements = history.map((item, index) => {
    const [userId, username, encodedProfileImgUrl] = item.clientId.split(":");
    const profileImgUrl = decodeURIComponent(encodedProfileImgUrl);
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const profile = profileVisible ? <Profile userId={userId} onClose={toggleProfile} cssOverride={profileCSSOverride} /> : <></>;

    return (
      <li key={index} className="message">
        <button type="button" onClick={toggleProfile} className="message-button">
          <img className="message-thumbnail" src={profileImgUrl} alt={username} />
        </button>
        <button className="sender message-button" type="button" onClick={toggleProfile}>
          {username}
        </button>
        <span className="time">{messageTime}</span>
        <span className="text">{item.data.text}</span>
        {profile}
      </li>
    );
  });

  return messageElements;
};

export default ChatList;
