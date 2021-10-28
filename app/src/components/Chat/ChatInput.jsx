import React from "react";

export const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "") {
      return 
    }
    sendMessage(message);
    setMessage("");
  };

  return (
    <form className="send" onSubmit={handleSubmit}>
      <textarea
        autoFocus
        className="send-input"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if(e.code == "Enter") {
             e.preventDefault();
             handleSubmit(e);
          }
        }}
        value={message}
      ></textarea>
      <button className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;
