import React from "react";
import ContentEditable from "react-contenteditable";

let timer = -1;

export const ChatInput = ({ sendMessage, sendStatus }) => {
  const [message, setMessage] = React.useState("");
  const clearStatusAfter = 5 * 1000; // miliseconds

  React.useEffect(() => {
    if (!message) return;
    if (timer < 0) sendStatus("start");

    const callback = () => {
      sendStatus("done");
      console.log({ timer });
      timer = -1;
    };

    clearTimeout(timer);
    timer = setTimeout(callback, clearStatusAfter);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!`${message}`.trim()) return;

    sendMessage(message);
    setMessage("");
    clearTimeout(timer);
    timer = -1;
    sendStatus("done");
  };

  const handleChange = ({ target }) => setMessage(target.value || "");

  const handleKeydown = (e) => {
    const passive = /^(control|arrow|shift|alt|meta|page|insert|home)/i;
    if (passive.test(e.code)) return;

    switch (e.code) {
      case "Enter":
        handleSubmit(e);
        break;

      default:
        // tarpit for keypress
        break;
    }
  };

  return (
    <form className="send" onSubmit={handleSubmit}>
      <ContentEditable className="send-message" html={ message } onChange={handleChange} onKeyDown={handleKeydown} />
      <button className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;
