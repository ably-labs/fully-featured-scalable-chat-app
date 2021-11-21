import React, { useState, useEffect } from "react";
import { useAuth } from "../../AppProviders";
import ChannelList from "./ChannelList";
import ChatContainer from "../Chat/ChatContainer";

export default ({ toggleChannelView }) => {
  const { api } = useAuth();
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("global-welcome");

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await api.listChannels();
      setChannels(response.channels);
    };
    fetchChannels();
  }, []);

  const channelSelected = (channel) => {
    setCurrentChannel(channel);

    toggleChannelView();
  };

  return (
    <>
      <ChannelList channels={channels} onChannelSelected={channelSelected} />
      <ChatContainer currentChannel={currentChannel} onChatExit={toggleChannelView} />
    </>
  );
};
