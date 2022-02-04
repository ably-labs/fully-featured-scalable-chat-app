import React, { useEffect, useRef, useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatList } from "./ChatList";
import { ChatInput } from "./ChatInput";
import useArchive from "./../../hooks/useArchive";
import autoScrollHistory from "./autoScrollHistory";
import "./chat.css";

const ChatInputStatus = ({ message }) => {
  return <>{message}</>;
};

const formatMessage = (eventObject) => {
  // coerse String to Object
  return typeof eventObject === "string" //
    ? { text: `${eventObject || ""}`.trim() }
    : eventObject;
};

const ChatContainer = ({ currentChannel, onChatExit }) => {
  const endOfChatLog = useRef(null);
  const [history, setHistory] = useState([]);

  // Reset history on channel change
  useEffect(() => setHistory([]), [currentChannel]);

  const [channel] = useChannel(currentChannel, (message) => {
    setHistory((prev) => [...prev.slice(-199), message]);
  });

  const [activity] = useChannel(`${currentChannel}_activity`, (message) => {
    // this sibling channel is non-persisted chatter, eg. typing indicator
    const { data } = message;
    const { text } = data;

    console.log("activity", text);
    switch (text) {
      case "done":
        setStatusMessage(null);
        break;

      default:
        setStatusMessage("Typing ...");
        break;
    }
  });

  const [archive, rewind] = useArchive(currentChannel);

  const [statusMessage, setStatusMessage] = React.useState(null);

  const sendMessage = (eventObject = null) => {
    channel.publish("message", formatMessage(eventObject));
    setStatusMessage(null);
  };

  const sendStatus = (eventObject = null) => {
    activity.publish("util_message", formatMessage(eventObject));
    setStatusMessage("typing ...", eventObject);
  };

  autoScrollHistory(archive, endOfChatLog);

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
      </ul>
      <ChatInput sendMessage={sendMessage} sendStatus={sendStatus} />
      <ChatInputStatus message={statusMessage} />
    </section>
  );
};

export default ChatContainer;
