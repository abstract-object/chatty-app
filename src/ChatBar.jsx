import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser ? this.props.currentUser : "Anonymous"} onKeyDown={this.newUsername}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.newMessage}/>
      </footer>
    );
  }

  newUsername = event => {
    if (event.key === "Enter") {
      this.props.changeUsername(event.target.value);
    }
  }
  newMessage = event => {
    if (event.key === "Enter") {
      const message = {username: this.props.currentUser, content: event.target.value};
      this.props.addMessage(message);
      event.target.value = "";
    }
  }
}

export default ChatBar;