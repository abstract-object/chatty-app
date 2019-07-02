import React, {Component} from 'react';

const Message = ({message}) => {
  return (
    <main className={message.type === "incomingMessage" && "message"}>
    {message.type === "incomingMessage" && <span className="message-username">{message.username}</span>}
    {message.type === "incomingNotification" ? <div className="message system">{message.content}</div> : <span className="message-content">{message.content}</span>}
    </main>
  );
};

export default Message;