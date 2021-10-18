import React from "react";
import { useAuth } from "../../AppProviders";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatHistory } from "./ChatHistory";
import { SelectAChannel } from "./SelectAChannel";
import { ChatInput } from "./ChatInput";
import "./chat.css";

const Chat = ({ currentChannel }) => {

  if (currentChannel === null) {
    return (<SelectAChannel />);
  }

  const { user } = useAuth();

  const [history, setHistory] = React.useState([]);
  const [channel, ably] = useChannel(currentChannel, (message) => {
    setHistory(prev => [...prev.slice(-199), message]);
  });

  const sendMessage = (messageText) => {
    channel.publish("message", { text: messageText, sender: user.username });
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
