// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Each user will get a random hex code on connecting
  ws.color = "#000000".replace(/0/g, () => {
    return (~~(Math.random()*16)).toString(16);
  });

  // Update user count when a user connects
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({type: "clientCount", value: wss.clients.size}));
    }
  });
  
  // Give each message a unique id and the associated user's colour
  ws.on('message', (message) => {
    message = JSON.parse(message);
    message.id = uuidv1();
    message.userColor = ws.color;
    if (message.type === "postNotification") {
      message.type = "incomingNotification";
    }
    
    // Broadcast new message back to every connected user
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    // Update user count when user disconnects
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({type: "clientCount", value: wss.clients.size}));
      }
    });
  });
});


