# ConnectX.v2

# Chat Application with Express.js and Socket.IO

This is a simple chat application built using Express.js and Socket.IO.

## Initial Setup

1. Make sure you have Node.js installed on your machine. You can download it from the official Node.js website: [https://nodejs.org](https://nodejs.org)

2. Clone this repository or download the source code.

3. Open a terminal or command prompt and navigate to the project directory.

4. Install the required dependencies by running the following command:

npm install express socket.io

## Running the Server

To start the server, run the following command:

node server.js

The server will start running and will be accessible at [http://localhost:3000](http://localhost:3000).

You can now open multiple browser windows or tabs and visit [http://localhost:3000](http://localhost:3000) to chat with other connected clients.

## Customizing the Whitelist

By default, the chat application allows only specific usernames to log in. To customize the whitelist and add or remove names, follow these steps:

1. Open the `server.js` file in a text editor.

2. Locate the following line:

   ```javascript
   const authorizedUsers = ['user1', 'user2', 'user3']; // Add the authorized usernames here

3. Add or remove usernames as desired within the square brackets ([]). For example, to allow 'user4' to log in, modify the line as follows: 

`const authorizedUsers = ['user1', 'user2', 'user3', 'user4'];` // Add the authorized usernames here

4. Save the server.js file.

5. Restart the server by running the following command: `node server.js`

