import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../hooks/useSocket'; // Assuming you have this hook
import { addMessage } from './chatSlice';
import MessageList from './MessageList';
import axios from 'axios';

const ChatWindow = ({ receiverId, receiverName }) => {
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const socket = useSocket(); // Your custom hook to get the socket instance
  const { user } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.chat);
  
  const currentMessages = conversations[receiverId] || [];

  // Fetch initial chat history
  useEffect(() => {
      if (receiverId) {
          // You'd dispatch an action to fetch history from the API
          // dispatch(getChatHistory(receiverId));
      }
  }, [receiverId, dispatch]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      senderId: user._id,
      receiverId,
      content: newMessage,
    };
    
    // Emit message via WebSocket
    socket.emit('sendMessage', messageData);
    
    // Add message to local state immediately for a responsive feel
    dispatch(addMessage({ conversationId: receiverId, message: { sender: user._id, content: newMessage } }));

    // Also send to backend to save in DB (important for history)
    try {
        await axios.post('/api/chat', { receiver: receiverId, content: newMessage }, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
    } catch (error) {
        console.error("Failed to save message", error);
    }

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-lg border">
      <div className="p-3 bg-gray-50 border-b">
        <h3 className="font-bold text-gray-800">Chat with {receiverName}</h3>
      </div>
      <MessageList messages={currentMessages} />
      <form onSubmit={handleSendMessage} className="p-3 border-t bg-gray-50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="input-style flex-1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="form-button px-4">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;