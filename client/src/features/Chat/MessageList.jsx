import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MessageList = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-100">
      {messages.map((msg, index) => {
        const isSender = msg.sender === user._id;
        return (
          <div key={index} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${isSender ? 'bg-emerald-500 text-white' : 'bg-white text-gray-800 shadow'}`}>
              <p>{msg.content}</p>
            </div>
          </div>
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;