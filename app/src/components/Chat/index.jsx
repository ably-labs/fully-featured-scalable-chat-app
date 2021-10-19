import React, { useState, useEffect } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatHistory } from "./ChatHistory";
import { SelectAChannel } from "./SelectAChannel";
import { ChatInput } from "./ChatInput";
import "./chat.css";

const Chat = ({ currentChannel }) => {

  if (currentChannel === null) {
    return (<SelectAChannel />);
  }

  const rewindParameters = "[?rewind=100]";
  const channelSubscription = rewindParameters + currentChannel;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([]); // Reset history on channel change
  }, [currentChannel]);

  const [channel, ably] = useChannel(channelSubscription, (message) => {
    setHistory(prev => [...prev.slice(-199), message]);
  });

  const sendMessage = (messageText) => {
    channel.publish("message", { text: messageText });
  };

  return (
    <section className="chat">
      <h2>{currentChannel}</h2>
      <ul>
        <ChatHistory history={history} />
      </ul>
      <ChatInput sendMessage={sendMessage} />
    </section>
  );
};
export default Chat;