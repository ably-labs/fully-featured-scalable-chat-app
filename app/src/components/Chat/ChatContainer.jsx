import React, { useEffect, useRef, useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatList } from "./ChatList";
import { ChatInput } from "./ChatInput";
import useArchive from "./../../hooks/useArchive";
import autoScrollHistory from "./autoScrollHistory";
import "./chat.css";

const ChatInputStatus = ({ message }) => {
  return <div className="send-status">{message}</div>;
};

const formatMessage = (eventObject) => {
  // coerse String to Object
  return typeof eventObject === "string" //
    ? { text: `${eventObject || ""}`.trim() }
    : eventObject;
};

const ChatContainer = ({ currentChannel, onChatExit }) => {
  const endOfChatLog = useRef(null);
  const [archive, rewind] = useArchive(currentChannel);

  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState([]);
  const [activity, setActivity] = useState();

  // Reset history on channel change

  const [channel] = useChannel(currentChannel, (message) => {
    setHistory((prev) => [...prev.slice(-199), message]);
  });

  const sendMessage = (eventObject = null) => {
    channel.publish("message", formatMessage(eventObject));
    setStatusMessage(null);
  };

  const sendStatus = (eventObject = null) => {
    channel.presence.enter();
    channel.presence.update(formatMessage(eventObject));
  };

  const handlePresenceUpdate = (member) => {
    const { data, clientId, connectionId } = member;
    const { text } = data;

    if (text === activity) return;

    // clients on channel excluding the author as shallow copy Object
    let clients = [];

    channel.presence.get((_, members) => {
      const typing = clientId === member.clientId;
      clients = members.map((client) => ({ ...client, typing }));
      console.log(typing, clientId, member.clientId);
    });

    switch (text) {
      case "start":
        console.log(text);
        setActivity("Typing ...");
        break;

      case "done":
        console.log(text);
        setActivity("");
        break;

      default:
        break;
    }
  };

  useEffect(() => setHistory([]), [currentChannel]);
  useEffect(() => setStatus(activity), [activity]);
  useEffect(() => channel.presence.subscribe(handlePresenceUpdate));

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
      <ChatInputStatus message={status} />
    </section>
  );
};

export default ChatContainer;
