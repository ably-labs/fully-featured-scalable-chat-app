import React from "react";
import "./chat.css";

const Chat = ({ currentChannel }) => {

  if (currentChannel === null) {
    return (<div>Please select a channel.</div>);
  }

  return (
    <section className="chat">
      <h2>{currentChannel}</h2>
      <ul>
        <li>Hello this is a chat message</li>
        <li>This is another chat message</li>
      </ul>
      <div className="send">
        <textarea></textarea>
        <button>Send</button>
      </div>
    </section>
  );
};

export default Chat;
