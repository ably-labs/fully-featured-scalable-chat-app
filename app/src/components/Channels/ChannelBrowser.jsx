import React, { useState, useEffect } from "react";
import { useAuth } from "../../AppProviders";
import ChannelList from "./ChannelList";
import ChatContainer from "../Chat/ChatContainer";

export default ({ toggleChannelView }) => {
  const { api } = useAuth();
  const [channels, setChannels] = useState([]);
  const [currentChannelName, setCurrentChannelName] = useState("");
  const [currentChannelId, setCurrentChannelId] = useState("");

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await api.listChannels();
      setChannels(response);
    };
    fetchChannels();
  }, []);

  const channelSelected = async (channel) => {
    setCurrentChannelName(channel.name);
    setCurrentChannelId(channel.id);
    toggleChannelView();
  };

  return (
    <>
      <ChannelList channels={channels} onChannelSelected={channelSelected} />
      <ChatContainer currentChannelName={currentChannelName} currentChannelId={currentChannelId} onChatExit={toggleChannelView} />
    </>
  );
};
