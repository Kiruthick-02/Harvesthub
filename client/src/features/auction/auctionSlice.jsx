import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auctionStatus: 'inactive', // Can be 'inactive', 'active', 'ended'
  currentItem: null,         // Will hold { name, quantity, sellerName, startingBid }
  currentBid: 0,
  highestBidderName: null,
  timeLeftSeconds: 0,
  messages: [],            // An array of message objects: { author, text, type }
  auctionHistory: [],      // A list of recently completed auctions
};

export const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    // This is called when the 'auctionStarted' event is received from the backend
    startAuction: (state, action) => {
      state.auctionStatus = 'active';
      state.currentItem = action.payload.item;
      state.currentBid = action.payload.item.startingBid;
      state.timeLeftSeconds = action.payload.durationSeconds;
      state.highestBidderName = 'No bids yet';
      state.messages = [action.payload.startMessage]; // Start with the bot's announcement
    },
    // Called by the 'newBidUpdate' event
    updateBid: (state, action) => {
      state.currentBid = action.payload.newBid;
      state.highestBidderName = action.payload.bidderName;
    },
    // Called by the 'newMessage' event (for bot messages, errors, etc.)
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Called by the 'timerTick' event
    tickTimer: (state, action) => {
      state.timeLeftSeconds = action.payload.timeLeft;
    },
    // Called by the 'auctionEnded' event
    endAuction: (state, action) => {
      state.auctionStatus = 'ended';
      state.messages.push(action.payload.endMessage);
      if (state.currentItem) {
          state.auctionHistory.unshift({ 
              ...state.currentItem, 
              winningBid: state.currentBid, 
              winner: state.highestBidderName 
          });
      }
    },
    // This cleans the UI before a farmer starts a new auction
    resetAuctionRoom: (state) => {
        state.auctionStatus = 'inactive';
        state.currentItem = null;
        state.currentBid = 0;
        state.highestBidderName = null;
        state.messages = [];
    }
  },
});

export const { 
    startAuction, 
    updateBid, 
    addMessage, 
    tickTimer, 
    endAuction, 
    resetAuctionRoom 
} = auctionSlice.actions;

export default auctionSlice.reducer;