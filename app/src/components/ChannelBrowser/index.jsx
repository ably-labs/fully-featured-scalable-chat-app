import React, { useState, useEffect } from "react";
import { useAuth } from "../../AppProviders";
import ChannelList from "../ChannelList";
import Chat from "../Chat";

export default () => {

    const { api } = useAuth();
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await api.listChannels();
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