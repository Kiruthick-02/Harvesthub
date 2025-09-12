const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const socketHandler = require('./sockets');
// Import the connection checker function from your weather config
const { checkWeatherAPIConnection } = require('./config/weather');
require('dotenv').config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set('socketio', io);
socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  
  // Call the function to check the API connection right after the server starts.
  checkWeatherAPIConnection();
});