const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // User joins a personal room based on their MongoDB User ID
    // This allows us to send notifications or messages directly to a specific user
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`User with ID: ${userId} joined room: ${userId}`);
    });

    // Listen for a chat message from a client
    socket.on('sendMessage', (data) => {
      const { senderId, receiverId, content } = data;
      // When a message is sent, we emit it to the receiver's private room
      // The message object should be saved to the database via an API call from the frontend first
      io.to(receiverId).emit('receiveMessage', {
        sender: senderId,
        content: content,
        createdAt: new Date().toISOString(),
      });
    });

    // Listen for real-time contract notifications
    socket.on('sendNotification', (data) => {
        const { recipientId, message, link } = data;
        // Emit a notification event to the recipient's room
        io.to(recipientId).emit('newNotification', {
            message,
            link,
            createdAt: new Date().toISOString(),
        });
    });


    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;