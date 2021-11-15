import React from "react";

export const ChatHistory = ({ history }) => {
  const messageElements = history.map((item, index) => {
    const user = item.clientId.split(":")[1];
    const profileImgUrl = decodeURIComponent(item.clientId.split(":")[2]);
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return (
      <li key={index} className="message">
        <img className="message-thumbnail" src={profileImgUrl} alt={user}/>
        <span className="sender">
          {user}
          <span className="time">{messageTime}</span>
        </span>
        <span className="text">{item.data.text}</span>
      </li>
    );
  });

  return messageElements;
};

export default ChatHistory;
