import React, { useState, useEffect } from "react";
import useProfileData from "../../hooks/useProfileData";
import { FloatingTogglableProfile } from "../Profile";

export const ChatList = ({ history }) => {
  const [messageElements, setMessageElements] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [profileTarget, setProfileTarget] = useState({ top: 0, right: 0 });

  const userIds = history.map((item) => {
    return item.clientId;
  });

  useProfileData(
    userIds,
    (profiles) => {
      const renderedMessages = history.map((item) => {
        const userId = item.clientId;
        const { username, profileImgUrl } = profiles[userId];
        const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const showProfile = (e) => {
          const { top, right } = e.target.getBoundingClientRect();
          setProfileTarget({ top, right });
          setSelectedProfile(userId);
        };

        return (
          <li key={item.id} className="message">
            <button type="button" onClick={showProfile} className="message-button">
              <img className="message-thumbnail" src={profileImgUrl} alt={username} />
            </button>
            <button className="sender message-button" type="button" onClick={showProfile}>
              {username}
            </button>
            <span className="time">{messageTime}</span>
            <span className="text">{item.data.text}</span>
          </li>
        );
      });

      setMessageElements(renderedMessages);
    },
    [history]
  );

  return (
    <>
      {messageElements}
      <FloatingTogglableProfile
        userId={selectedProfile}
        target={profileTarget}
        onClose={() => {
          setSelectedProfile("");
        }}
      />
    </>
  );
};
