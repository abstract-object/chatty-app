import React from 'react';

// Renders notification of name change and messages differently depending on type
// also automatically generates images if an image url is detected
const Message = ({message}) => {
  return (
    <main className={message.type === "incomingMessage" && "message"}>
    {message.type === "incomingMessage" && <span className="message-username" style={message.userColor ? {color: message.userColor} : null}>{message.username ? message.username : "Anonymous"}</span>}
    {message.type === "incomingNotification" ? <div className="message system">{message.content}</div> : <span className="message-content">{message.content.match(/(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/) ? <img src={message.content}/> : message.content}</span>}
    </main>
  );
};

export default Message;