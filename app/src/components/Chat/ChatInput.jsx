import React from "react";

let timer = null;

export const ChatInput = ({ sendMessage, sendStatus }) => {
  const [message, setMessage] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState(null);
  const clearStatusAfter = 5 * 1000; // miliseconds

  React.useEffect(() => {
    if (timer === null) {
      sendStatus("start");
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      setStatusMessage(null);
      sendStatus("done");
      timer = null;
    }, clearStatusAfter);
  }, [statusMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!`${message}`.trim()) return;
    sendMessage(message);
    setMessage(null);
  };

  const handleChange = ({ target }) => setMessage(target.value);

  const handleKeydown = (e) => {
    switch (e.code) {
      case "Enter":
        handleSubmit(e);
        break;

      default:
        // tar-pit for keystrokes
        setStatusMessage("typing...");
    }
  };
  return (
    <form className="send" onSubmit={handleSubmit}>
      <textarea autoFocus className="send-input" onChange={handleChange} onKeyDown={handleKeydown} value={message}></textarea>
      <button className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;
