import React, { useState, useEffect } from "react";
import { BffApiClient } from "../../sdk/BffApiClient";
import ChannelList from "../../components/ChannelList";
import Chat from "../../components/Chat";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default () => {
  const params = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    //todo: put this functionality in a shared context
    const fetchChannels = async () => {
      const auth0Token = await getAccessTokenSilently();
      const bffClient = new BffApiClient(auth0Token);
      const response = await bffClient.listChannels();
      setChannels(response.channels);
    };
    fetchChannels();
  }, []);

  const channelSelected = (channel) => {
    setCurrentChannel(channel);
  };

  return (
    <>
      <ChannelList channels={channels} onChannelSelected={channelSelected} />
      <Chat currentChannel={currentChannel} />
    </>
  );
};
