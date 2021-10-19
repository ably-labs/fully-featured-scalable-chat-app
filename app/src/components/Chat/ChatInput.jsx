import React from 'react';

export const ChatInput = ({ sendMessage }) => {

    const [message, setMessage] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    };

    return (
        <form className="send" onSubmit={handleSubmit}>
            <textarea onChange={(e) => { setMessage(e.target.value) }} value={message}></textarea>
            <button>Send</button>
        </form>
    );
}

export default ChatInput;