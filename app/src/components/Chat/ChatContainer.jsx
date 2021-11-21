import React, { useState, useEffect } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatList } from "./ChatList";
import { ChatInput } from "./ChatInput";
import Profile from "../Profile";
import "./chat.css";

const ChatContainer = ({ currentChannel, onChatExit }) => {
  let messageEnd = null;

  const rewindParameters = "[?rewind=100]";
  const channelSubscription = rewindParameters + currentChannel;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([]); // Reset history on channel change
  }, [currentChannel]);

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" }); // scroll page to bottom
  }, [history]);

  const [channel, ably] = useChannel(channelSubscription, (message) => {
    setHistory((prev) => [...prev.slice(-199), message]);
  });

  const sendMessage = (messageText) => {
    channel.publish("message", { text: messageText });
  };

  return (
    <section className="chat">
      <header className="authed">
        <button className="exit" onClick={onChatExit} type="button">
          Back
        </button>
        <h2>
          {currentChannel}
          <span className="members">1 member</span>
        </h2>
      </header>
      <ul className="messages">
        <ChatList history={history} />
        <li
          className="end-message"
          ref={(element) => {
            messageEnd = element;
          }}
        />
      </ul>
      <ChatInput sendMessage={sendMessage} />
    </section>
  );
};
export default ChatContainer;
