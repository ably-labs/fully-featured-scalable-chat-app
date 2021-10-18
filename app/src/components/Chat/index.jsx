import React from "react";
import "./chat.css";

const Chat = () => {
  return (
    <section class="chat">
        <ul>
            <li>Hello this is a chat message</li>
            <li>This is another chat message</li>
        </ul>
        <div class="send">
          <textarea></textarea>
          <button>Send</button>
        </div>
    </section>
  );
};

export default Chat;
