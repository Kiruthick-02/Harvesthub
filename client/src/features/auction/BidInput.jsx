import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BidInput = ({ socket }) => {
  const [bidAmount, setBidAmount] = useState('');
  
  // Get all the necessary data from the Redux store
  const { user } = useSelector((state) => state.auth);
  const { currentBid, currentItem } = useSelector((state) => state.auction);

  // --- THIS IS THE CRITICAL "FAIR PLAY" FIX ---
  // Determine if the currently logged-in user is the seller of the item.
  const isSeller = user && currentItem && user.name === currentItem.sellerName;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(bidAmount, 10);
    if (isNaN(amount) || amount <= 0) return;
    
    socket.emit('placeBid', { amount });
    setBidAmount('');
  };

  // If the user is the seller, render a disabled message instead of the form.
  if (isSeller) {
    return (
      <div className="p-4 bg-gray-100 border-t text-center font-semibold text-gray-500">
        You are the seller of this item and cannot place bids.
      </div>
    );
  }

  // Otherwise, render the bidding form for the buyer.
  return (
    <form onSubmit={handleBidSubmit} className="p-4 bg-gray-50 border-t flex items-center space-x-2">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder={`Enter a bid > ₹${currentBid}`}
        className="input-style flex-1"
        required
      />
      <button type="submit" className="form-button px-6">
        Place Bid
      </button>
    </form>
  );
};

export default BidInput;