// Import the single, global instance of our auction state manager
const auctionManager = require('./AuctionStateManager');

/**
 * The main Socket.IO connection handler for the application.
 * This function is called for every new client that connects.
 */
const socketHandler = (io) => {
  // This event fires for every new user connection
  io.on('connection', (socket) => {
    console.log(`✅ A user connected with socket ID: ${socket.id}`);

    // --- SETUP ALL EVENT LISTENERS FOR THIS USER ---

    // 1. Identification Listener
    socket.on('identify', ({ userId, name }, ack) => {
      auctionManager.identifyUser(socket.id, userId, name);
      console.log(`🤝 User identified: ${name} (Socket: ${socket.id})`);
      if (typeof ack === 'function') ack({ status: 'ok' });
    });

    // 2. Auction Listeners (delegated to the state manager)
    socket.on('startAuction', (data) => {
      auctionManager.startAuction(io, socket, data);
    });

    socket.on('placeBid', (data) => {
      auctionManager.placeBid(io, socket, data);
    });
    
    // 3. Disconnect Listener
    socket.on('disconnect', () => {
      const user = auctionManager.getUser(socket.id);
      if (user) {
          console.log(`🔌 User disconnected: ${user.name} (Socket: ${socket.id})`);
      } else {
          console.log(`🔌 Anonymous user disconnected (Socket: ${socket.id})`);
      }
      auctionManager.removeUser(socket.id);
    });

    // You can add other non-auction listeners (like for private chat) here
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`🚪 User with socket ${socket.id} joined private room: ${userId}`);
    });
  });
};

module.exports = socketHandler;