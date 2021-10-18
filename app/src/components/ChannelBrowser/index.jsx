import React, { useState, useEffect } from "react";
import { useAuth } from "../../AppProviders";
import ChannelList from "../ChannelList";
import Chat from "../Chat";
import { BffApiClient } from "../../sdk/BffApiClient";

export default () => {

    const { auth } = useAuth();
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);

    useEffect(() => {
        const fetchChannels = async () => {
            const client = new BffApiClient();
            const response = await client.listChannels(auth.token);
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
        </>);
}