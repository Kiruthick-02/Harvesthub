import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { startAuction, updateBid, addMessage, tickTimer, endAuction, resetAuctionRoom } from '../features/auction/auctionSlice';
import AuctionInfoPanel from '../features/auction/AuctionInfoPanel';
import ChatWindow from '../features/auction/ChatWindow';
import BidInput from '../features/auction/BidInput';
import StartAuctionModal from '../features/auction/StartAuctionModal';
import { FaGavel } from 'react-icons/fa';

const socket = io('http://localhost:5000');

const AuctionPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { auctionStatus } = useSelector((state) => state.auction);
  const [isModalOpen, setModalOpen] = useState(false);
  
  // This state now tracks the full handshake: connected AND identified.
  const [isIdentified, setIsIdentified] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      console.log('Socket.IO connected. Sending identification...');
      if (user) {
        // --- THIS IS THE CRITICAL CHANGE ---
        // We now send the event with an acknowledgment callback.
        socket.emit('identify', { userId: user._id, name: user.name }, (response) => {
          if (response.status === 'ok') {
            console.log('User identified successfully on the backend.');
            setIsIdentified(true); // Handshake complete!
          } else {
            console.error('User identification failed on the backend.');
            setIsIdentified(false);
          }
        });
      }
    };
    
    socket.on('connect', handleConnect);
    socket.on('disconnect', () => setIsIdentified(false));
    socket.on('auctionStarted', (data) => dispatch(startAuction(data)));
    socket.on('newBidUpdate', (data) => dispatch(updateBid(data)));
    socket.on('newMessage', (data) => dispatch(addMessage(data)));
    socket.on('timerTick', (data) => dispatch(tickTimer(data)));
    socket.on('auctionEnded', (data) => dispatch(endAuction(data)));
    
    // If the socket is already connected when the component mounts, run the connect logic.
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect');
      socket.off('auctionStarted');
      socket.off('newBidUpdate');
      socket.off('newMessage');
      socket.off('timerTick');
      socket.off('auctionEnded');
    };
  }, [dispatch, user]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <AuctionInfoPanel />
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        <ChatWindow />
        {auctionStatus === 'active' && user && isIdentified ? (
          <BidInput socket={socket} />
        ) : (
          <div className="p-4 text-center bg-gray-50 border-t text-gray-500 font-semibold">
            {auctionStatus === 'ended' ? "This auction has ended." : "The auction has not started yet."}
          </div>
        )}
      </div>
      {auctionStatus !== 'active' && user && user.role === 'farmer' && (
        <div className="p-4 bg-white border-t">
          <button
            onClick={() => {
                dispatch(resetAuctionRoom());
                setModalOpen(true);
            }}
            // Button is disabled until the full handshake is complete.
            disabled={!isIdentified}
            className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaGavel className="mr-2" />
            {isIdentified ? 'Start New Auction' : 'Connecting to Server...'}
          </button>
        </div>
      )}
      {isModalOpen && <StartAuctionModal socket={socket} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default AuctionPage;