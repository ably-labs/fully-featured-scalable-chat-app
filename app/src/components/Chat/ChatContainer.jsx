import React, { useEffect, useRef, useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatList } from "./ChatList";
import { ChatInput } from "./ChatInput";
import useArchive from "./../../hooks/useArchive";
import ScrollPoint from "./ScrollPoint";
import "./chat.css";

const ChatContainer = ({ currentChannel, onChatExit }) => {
  const endOfChatLog = useRef(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([]); // Reset history on channel change
  }, [currentChannel]);

  const [channel] = useChannel(currentChannel, (message) => {
    setHistory((prev) => [...prev.slice(-199), message]);
  });

  const [archive, rewind] = useArchive(currentChannel);

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
        <ChatList history={archive} />
        <ChatList history={history} />
        <li className="end-message" ref={endOfChatLog} />
        <ScrollPoint watch={archive} />
      </ul>
      <ChatInput sendMessage={sendMessage} />
    </section >
  );
};

export default ChatContainer;