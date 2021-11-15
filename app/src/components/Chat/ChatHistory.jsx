import React from "react";

export const ChatHistory = ({ history }) => {
  const messageElements = history.map((item, index) => {
    const user = item.clientId.split(":")[1];
    const profileImgUrl = decodeURIComponent(item.clientId.split(":")[2]);
    return (
      <li key={index} className="message">
        <img className="message-thumbnail" src={profileImgUrl}></img>
        <span className="sender">{user}</span>
        <span className="text">{item.data.text}</span>
      </li>
    );
  });

  return messageElements;
};

export default ChatHistory;
