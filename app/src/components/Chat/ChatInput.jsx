import React from "react";
import ContentEditable from "react-contenteditable";

export const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }
    sendMessage(message);
    setMessage("");
  };

  const handleKeydown = (e) => {
    // implimentation placeholder
    return;
  };

  return (
    <form className="send" onSubmit={handleSubmit}>
      <ContentEditable className="send-message" html={message} onChange={handleChange} onKeyDown={handleKeydown} />
      <button className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;
