import React from "react";

export const ChatHistory = ({ history }) => {
  const messageElements = history.map((item, index) => {
    const user = item.clientId.split(":")[1];
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return (
      <li key={index} className="message">
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
