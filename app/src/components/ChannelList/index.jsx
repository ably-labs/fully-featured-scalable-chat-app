import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./channellist.css";

const ChannelList = ({ channels, onChannelSelected }) => {
  const { user } = useAuth0();

  const selectChannel = (evt, channel) => {
    evt.preventDefault();
    onChannelSelected(channel.name);
  };

  const channelListItems = channels.map((channel) => (
    <li key={channel.name}>
      <Link
        to={`/channel/${channel.name}`}
        onClick={(evt) => {
          selectChannel(evt, channel);
        }}
      >
        {channel.name}
      </Link>
    </li>
  ));

  return (
    <section className="channellist">
      <h2>Channels</h2>
      <ul>{channelListItems}</ul>
      <h2>DMs</h2>
      <ul>
        <li>{user.nickname}</li>
      </ul>
    </section>
  );
};

export default ChannelList;
