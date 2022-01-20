import React, { useState } from "react";
import useProfileData from "../../hooks/useProfileData";
import { FloatingTogglableProfile } from "../Profile";
import processMessageExtensions from "./Extensions/ContentExtensions";

export const ChatList = ({ history }) => {
  const [messageElements, setMessageElements] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [profileTarget, setProfileTarget] = useState({ top: 0, right: 0 });

  const dedupedHistory = history.reduce((prev, message) => {
    if (!prev.some((m) => m.id === message.id)) {
      prev.push(message);
    }
    return prev;
  }, []);

  const userIds = dedupedHistory.map((item) => { return item.clientId; }).filter(x => x !== undefined);
  const chatMessages = dedupedHistory.filter((item) => { return item.name === "message" });

  useProfileData(
    userIds,
    (profiles) => {

      const renderedMessages = chatMessages.map((item) => {
        const userId = item.clientId;
        const { username, profileImgSmallUrl } = profiles[userId];
        const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const additionalContent = processMessageExtensions(item, history);

        const showProfile = (e) => {
          const { top, right } = e.target.getBoundingClientRect();
          setProfileTarget({ top, right });
          setSelectedProfile(userId);
        };

        return (
          <li key={item.id} className="message">
            <button type="button" onClick={showProfile} className="message-button">
              <img className="message-thumbnail" src={profileImgSmallUrl} alt={username} />
            </button>
            <button className="sender message-button" type="button" onClick={showProfile}>
              {username}
            </button>
            <span className="time">{messageTime}</span>
            <span className="text">{item.data.text}</span>
            {additionalContent}
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
