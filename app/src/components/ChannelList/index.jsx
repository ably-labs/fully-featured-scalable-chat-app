import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AppProviders";

import "./channellist.css";

const ChannelList = ({ channels, onChannelSelected }) => {

  const { user } = useAuth();

  const selectChannel = (evt, channel) => {
    evt.preventDefault();
    onChannelSelected(channel.name);
  };

  const channelListItems = channels.map((channel) => (
    <li key={channel.name}>
      <Link to={`/channel/${channel.name}`} onClick={(evt) => { selectChannel(evt, channel); }}>{channel.name}</Link>
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
        <li>{user.username}</li>
      </ul>
    </section>
  );
};

export default ChannelList;
