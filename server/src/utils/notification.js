// This function would be called from controllers after a significant event.
// It sends a real-time notification to the relevant user.
const sendNotification = (io, recipientId, notification) => {
    // The `notification` object could have a structure like:
    // { type: 'CONTRACT_UPDATED', message: 'Your contract status changed to Active', link: '/contracts/123' }
    if (io && recipientId && notification) {
        io.to(recipientId.toString()).emit('newNotification', notification);
    }
};

module.exports = {
    sendNotification,
};

// Example usage within a controller:

const { sendNotification } = require('../utils/notification');
const io = req.app.get('socketio'); // Assuming you attach io to the app instance

// Inside an async controller function...
const updatedContract = await contract.save();
sendNotification(io, contract.buyer, {
    type: 'CONTRACT_STATUS_CHANGE',
    message: `Contract for ${contract.produce} was updated by the farmer.`,
    link: `/contracts/${contract._id}`,
});
