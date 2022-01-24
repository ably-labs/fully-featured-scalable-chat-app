import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AppProviders";

import Header from "../Header/AuthHeader";
import "./channellist.css";

const ChannelList = ({ channels, onChannelSelected }) => {
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

  return (<>
    <section className="channellist">
      <Header />
      <h2>Channels</h2>
      <ul>{channelListItems}</ul>
    </section>
  </>
  );
};

export default ChannelList;
