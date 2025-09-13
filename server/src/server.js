const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const socketHandler = require('./sockets'); // This now points to your updated index.js
const { checkWeatherAPIConnection } = require('./config/weather');
// We ONLY import the state manager for the startup cleanup task
const auctionManager = require('./sockets/AuctionStateManager');
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

server.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  
  // This call will now work perfectly
  await auctionManager.cleanupStaleAuctions();
  
  checkWeatherAPIConnection();
});