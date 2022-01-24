import { useEffect, useState } from "react";
import { useAuth } from "../AppProviders";

export function useArchive(currentChannel, callback) {
    const [archive, setArchive] = useState([]);
    const [offset, setOffset] = useState(0);
    const [nextHistoryPosition, setNextHistoryPosition] = useState(0);

    const { api } = useAuth();

    useEffect(async () => {
        setArchive([]);
    }, [currentChannel]);

    useEffect(async () => {
        const { messages, position } = await api.getArchive(currentChannel, nextHistoryPosition);

        setArchive((prev) => [...messages, ...prev]);
        setNextHistoryPosition(position);

        callback?.call(this, archive);
    }, [currentChannel, offset]);

    const rewind = () => {
        setOffset(nextHistoryPosition);
    };

    return [
        archive,
        rewind,
    ];
}

export default useArchive;