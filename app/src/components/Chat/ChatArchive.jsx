import React, { useEffect, useState } from "react";
import { ChatList } from "./ChatList";
import { useAuth } from "../../AppProviders";

// This component needs styling as it currently breaks the UI.

export const ChatArchive = ({ currentChannel }) => {
    const { api } = useAuth();

    const [history, setHistory] = useState([]);
    const [nextHistoryPosition, setNextHistoryPosition] = useState(0);

    useEffect(async () => {
        setHistory([]);
        const { messages, position } = await api.getArchive(currentChannel, nextHistoryPosition);

        setHistory((prev) => [...messages, ...prev]);
        setNextHistoryPosition(position);
    }, [currentChannel]);

    return (
        <ChatList history={history} />
    );
};

export default ChatArchive;