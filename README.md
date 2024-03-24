# NodeJS-Chat-Server
NodeJS Chat Server is a real-time chat server built with Node.js. This project aims to provide a simple yet powerful platform for users to join chat rooms, send messages, and access chat history.

User authentication with basic username/password login.
{"username":"username", "password": "password"}
A single chat room created upon server startup.
Persistent storage of chat messages in a MongoDB database.
Real-time message sending and retrieval through WebSocket.
RESTful endpoints for message operations.
Scalability considerations with Redis for message broadcasting.

## Getting Started

### Dependencies
- Node.js
- Express
- TypeScript

### Installing
- Clone the repository: `git clone https://github.com/gevorgabgaryan/NodeJS-Chat-Server.git`
- Change directory to the project folder: `cd NodeJS-Chat-Server`
- Install dependencies: `npm install`
- Copy .env-sample .env

### Executing program
- Development mode: `npm run dev`

### Usage
  1.  Build and start the application
      -  docker-compose up --build
  2. The application will be running on
      -  http://localhost:4000
      -  ws://localhost:1990

### Testing
   `npm test`

### Contact
   For any inquiries, please contact Gevorg
   at gevorg.gak@gmail.com