import React from "react";

export const ChatHistory = ({ history }) => {

    const messageElements = history.map((item, index) => {
        return (
            <li key={index} className="message">
                <span className="sender">{item.data.sender}</span>
                <span className="text">{item.data.text}</span>
            </li>
        );
    });

    return (<>{messageElements}</>);
}

export default ChatHistory;