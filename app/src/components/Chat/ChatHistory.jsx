import React from "react";

export const ChatHistory = ({ history }) => {
  const messageElements = history.map((item, index) => {
    const user = item.clientId.split(":")[1];
    return (
      <li key={index} className="message">
        <span className="sender">{user}</span>
        <span className="text">{item.data.text}</span>
      </li>
    );
  });

  return messageElements;
};

export default ChatHistory;
