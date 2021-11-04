import React from "react";

export const ChatHistory = ({ history }) => {
  const messageElements = history.map((item, index) => {
    return (
      <li key={index} className="message">
        {<span className="sender">{item.data.name}</span>}
        {/* todo: add user metadata via presence */}
        <span className="text">{item.data.text}</span>
      </li>
    );
  });

  return messageElements;
};

export default ChatHistory;
