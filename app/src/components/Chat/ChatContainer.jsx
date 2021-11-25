import React, { useState, useEffect } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { useAuth } from "../../AppProviders";
import { ChatList } from "./ChatList";
import { ChatInput } from "./ChatInput";
import "./chat.css";

const ChatContainer = ({ currentChannelName, currentChannelId, onChatExit }) => {
  let messageEnd = null;

  const { api } = useAuth();
  const rewindParameters = "[?rewind=100]";
  const channelSubscription = rewindParameters + currentChannelName;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([]); // Reset history on channel change
  }, [currentChannelName]);

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" }); // scroll page to bottom
  }, [history]);

  const [channel, ably] = useChannel(channelSubscription, (message) => {
    setHistory((prev) => [...prev.slice(-199), message]);
  });

  const sendMessage = (messageText) => {
    channel.publish("message", { text: messageText });
  };

  const displayChannelMetadata = async () => {
    const response = await api.getChannelMetadata(currentChannelId);
    console.log(response);
  };

  return (
    <section className="chat">
      <header className="authed">
        <button className="exit" onClick={onChatExit}>
          Back
        </button>
        <h2>
          <span onClick={displayChannelMetadata}> {currentChannelName}</span>
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
        ></li>
      </ul>
      <ChatInput sendMessage={sendMessage} />
    </section>
  );
};
export default ChatContainer;
