import React from "react";
import "./channellist.css";
import { useAuth } from "../../AppProviders";
import { BffApiClient } from "../../sdk/BffApiClient";

const ChannelList = () => {

  const { auth } = useAuth();
  const [channels, setChannels] = React.useState([]);

  // Bug in this :)
  // (async () => {
  //   console.log("auth", auth);
  //   const client = new BffApiClient(auth.token);  
  //  // const channels = await client.listChannels();
  //   setChannels(channels);
  // })();

  // console.log(channels);

  return (
    <section className="channellist">
        <h2>Channels</h2>
        <ul>
            <li>Welcome Channel</li>
        </ul>
        <h2>DMs</h2>
       <ul>
           <li>{auth.userDetails.username}</li>
       </ul>
    </section>
  );
};

export default ChannelList;
