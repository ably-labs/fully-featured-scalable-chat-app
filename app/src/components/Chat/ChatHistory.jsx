import React from "react";
import { useAuth } from "../../AppProviders";

export const ChatHistory = ({ history }) => {
  const { api } = useAuth();

  const messageElements = history.map((item, index) => {
    const [userId, userName, encodedProfileImgUrl] = item.clientId.split(":");
    const profileImgUrl = decodeURIComponent(encodedProfileImgUrl);
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const getUserProfileDetails = async () => {
      const response = await api.getUserProfile(userId);
      console.log(response);
    };

    return (
      <li key={index} className="message">
        <img className="message-thumbnail" src={profileImgUrl} alt={userName} onClick={getUserProfileDetails} />
        <span className="sender" onClick={getUserProfileDetails}>
          {userName}
          <span className="time">{messageTime}</span>
        </span>
        <span className="text">{item.data.text}</span>
      </li>
    );
  });

  return messageElements;
};

export default ChatHistory;
