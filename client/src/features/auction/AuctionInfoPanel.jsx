import React from 'react';
import { useSelector } from 'react-redux';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const AuctionInfoPanel = () => {
  const { auctionStatus, currentItem, currentBid, highestBidderName, timeLeftSeconds, auctionHistory } = useSelector((state) => state.auction);

  // --- RENDER THIS WHEN AN AUCTION IS ACTIVE ---
  if (auctionStatus === 'active') {
    return (
      <div className="bg-gray-800 text-white p-4 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-lg">
        <div className="text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Item</p>
          <p className="text-lg font-bold">{currentItem.name} ({currentItem.quantity})</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Current Bid</p>
          <p className="text-2xl font-bold text-emerald-400">${currentBid}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Highest Bidder</p>
          <p className="text-lg font-bold">{highestBidderName}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Time Left</p>
          <p className="text-2xl font-bold text-red-500">{formatTime(timeLeftSeconds)}</p>
        </div>
      </div>
    );
  }

  // --- RENDER THIS WHEN THE ROOM IS IDLE (inactive or ended) ---
  return (
    <div className="bg-white p-6 rounded-b-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Auction Room</h2>
      <p className="text-gray-600 mb-6">Welcome! The room is currently idle. While you wait for the next live auction, you can view the results of recent sales below.</p>
      
      {auctionHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Auctions</h3>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
            {auctionHistory.map((item, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Sold to {item.winner}</p>
                </div>
                <p className="font-semibold text-emerald-600">${item.winningBid}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionInfoPanel;