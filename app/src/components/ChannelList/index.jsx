import React, { useEffect } from "react";
import "./channellist.css";
import { useAuth } from "../../AppProviders";
import { BffApiClient } from "../../sdk/BffApiClient";

const ChannelList = () => {

  const { auth } = useAuth();
  const [channels, setChannels] = React.useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const client = new BffApiClient();
      const response = await client.listChannels(auth.token);
      setChannels(response.channels);
    };
    fetchChannels();
  }, []);

  const channelListItems = channels.map((channel) => (
    <li key={channel.name}>
      <a href={`/channel/${channel.name}`}>{channel.name}</a>
    </li>
  ));

  return (
    <section className="channellist">
      <h2>Channels</h2>
      <ul>
        {channelListItems}
      </ul>
      <h2>DMs</h2>
      <ul>
        <li>{auth.userDetails.username}</li>
      </ul>
    </section>
  );
};

export default ChannelList;
