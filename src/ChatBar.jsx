import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser ? this.props.currentUser : "Anonymous"}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.onKeyDown}/>
      </footer>
    );
  }

  onKeyDown = event => {
    if (event.key === "Enter") {
      const message = {username: this.props.currentUser, content: event.target.value};
      this.props.addMessage(message);
      event.target.value = "";
    }
  }
}

export default ChatBar;