import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatWindow = () => {
  const { messages } = useSelector((state) => state.auction);
  const { user } = useSelector((state) => state.auth); // Get the current user
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMessageStyle = (msg) => {
    // --- THIS IS A UI/UX IMPROVEMENT ---
    // Check if the message author is the current logged-in user
    const isMyMessage = user && user.name === msg.author;

    if (msg.type === 'BOT') return 'bg-emerald-600 text-white font-bold text-center py-2';
    if (msg.type === 'ERROR') return 'bg-red-100 text-red-700 border-l-4 border-red-500';
    // Style my own bids differently
    if (msg.type === 'BID' && isMyMessage) return 'bg-green-100 border-l-4 border-green-500 text-right';
    if (msg.type === 'BID' && !isMyMessage) return 'bg-blue-100 border-l-4 border-blue-500';
    
    return 'bg-gray-100';
  };

  return (
    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`p-3 rounded-lg ${getMessageStyle(msg)}`}>
          {/* Another small improvement: Don't repeat the author's name if it's a bid update */}
          {msg.type === 'BID' ? (
             <p>💸 {msg.text}</p>
          ) : (
             <p><span className="font-semibold">{msg.author}:</span> {msg.text}</p>
          )}
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;