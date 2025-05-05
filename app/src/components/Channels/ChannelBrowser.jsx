import React, { useState, useEffect } from "react";
import { useAuth } from "../../AppProviders";
import ChannelList from "./ChannelList";
import ChatContainer from "../Chat/ChatContainer";

// eslint-disable-next-line react/function-component-definition
export default function ({ toggleChannelView }) {
  const { api } = useAuth();
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  const [] = useState("");

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await api.listChannels();
      const { channels } = response;
      setChannels(channels);
      setCurrentChannel(channels[0].name);
    };
    fetchChannels();
  }, []);

  const channelSelected = (channel) => {
    setCurrentChannel(channel);

    toggleChannelView();
  };

  return !currentChannel ? null : (
    <>
      <ChannelList channels={channels} onChannelSelected={channelSelected} />
      <ChatContainer currentChannel={currentChannel} onChatExit={toggleChannelView} />
    </>
  );
}
