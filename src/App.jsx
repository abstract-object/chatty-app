import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {clients: 0, currentUser: {name: null}, messages: []}
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onopen = event => {
      console.log("Connected to server");
    }
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage)
      if (newMessage.type === "clientCount") {
        this.setState({clients: newMessage.value});
      } else {
        const messages = this.state.messages.concat(newMessage);
        this.setState({messages});
      }
    }
  }

  render() {
    return (
      <section>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-online">{`${this.state.clients} ${(this.state.clients === 1 ? "user" : "users")} online`}</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} changeUsername={this.changeUsername}/>
      </section>
    );
  }

  addMessage = message => {
    message.type = "incomingMessage";
    this.socket.send(JSON.stringify(message));
  }

  changeUsername = newUsername => {
    const nameMessage = {
      type: "postNotification",
      content: `${this.state.currentUser.name} changed their name to ${newUsername}`,
    }
    this.setState({currentUser: {name: newUsername}});
    this.socket.send(JSON.stringify(nameMessage));
  }
}

export default App;
