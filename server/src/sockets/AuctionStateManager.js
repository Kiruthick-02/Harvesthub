const Auction = require('../models/Auction');
const Contract = require('../models/Contract');

class AuctionStateManager {
  constructor() {
    if (AuctionStateManager.instance) return AuctionStateManager.instance;
    this.currentAuction = null;
    this.auctionTimer = null;
    this.connectedUsers = new Map();
    AuctionStateManager.instance = this;
  }
  identifyUser(socketId, userId, name) { this.connectedUsers.set(socketId, { userId, name }); }
  removeUser(socketId) { this.connectedUsers.delete(socketId); }
  getUser(socketId) { return this.connectedUsers.get(socketId); }
  async cleanupStaleAuctions() {
    try {
      const stale = await Auction.find({ status: 'active' });
      if (stale.length > 0) {
        console.log(`🧹 Found ${stale.length} stale auction(s). Cleaning up...`);
        await Auction.updateMany({ status: 'active' }, { $set: { status: 'cancelled' } });
      }
      this.currentAuction = null;
    } catch (error) { console.error('Error during stale auction cleanup:', error); }
  }
  async startAuction(io, socket, data) {
    if (this.currentAuction) return socket.emit('newMessage', { author: 'Auctioneer', text: 'An auction is already in progress.', type: 'ERROR' });
    const user = this.getUser(socket.id);
    if (!user) return socket.emit('newMessage', { author: 'Auctioneer', text: 'Authentication error. Please refresh.', type: 'ERROR' });
    try {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + data.duration * 60000);
      const newAuction = new Auction({
        seller: user.userId, sellerName: user.name, itemName: data.name,
        quantity: data.quantity, startingBid: data.startingBid,
        currentBid: data.startingBid, minIncrement: data.minIncrement,
        startTime, endTime,
      });
      this.currentAuction = await newAuction.save();
      const payload = {
        item: { name: this.currentAuction.itemName, quantity: this.currentAuction.quantity, sellerName: this.currentAuction.sellerName, startingBid: this.currentAuction.startingBid },
        durationSeconds: data.duration * 60,
        startMessage: { author: 'Auctioneer', text: `📢 NEW AUCTION! ${user.name} is selling ${data.quantity} of ${data.name}. Starting bid is ₹${data.startingBid}.`, type: 'BOT' },
      };
      io.emit('auctionStarted', payload);
      this.auctionTimer = setInterval(() => {
        if (!this.currentAuction) { clearInterval(this.auctionTimer); return; }
        const timeLeft = Math.round((this.currentAuction.endTime.getTime() - new Date().getTime()) / 1000);
        io.emit('timerTick', { timeLeft });
        if (timeLeft <= 0) { this.endAuction(io); }
      }, 1000);
    } catch (error) {
      console.error("❌ CRITICAL ERROR starting auction:", error.message);
      socket.emit('newMessage', { author: 'Auctioneer', text: `Could not start auction. Server Error: ${error.message}`, type: 'ERROR' });
      this.currentAuction = null;
    }
  }
  async placeBid(io, socket, { amount }) {
    if (!this.currentAuction) return socket.emit('newMessage', { author: 'Auctioneer', text: 'The auction is not active.', type: 'ERROR' });
    const bidder = this.getUser(socket.id);
    if (!bidder) return socket.emit('newMessage', { author: 'Auctioneer', text: 'You must be logged in to bid.', type: 'ERROR' });
    if (this.currentAuction.seller.toString() === bidder.userId.toString()) return socket.emit('newMessage', { author: 'Auctioneer', text: 'As the seller, you cannot bid on your own item.', type: 'ERROR' });
    const minNextBid = this.currentAuction.currentBid + (this.currentAuction.minIncrement || 1);
    if (amount < minNextBid) return socket.emit('newMessage', { author: 'Auctioneer', text: `Your bid of ₹${amount} is too low. The next bid must be at least ₹${minNextBid}.`, type: 'ERROR' });
    try {
        this.currentAuction.currentBid = amount;
        this.currentAuction.highestBidder = bidder.userId;
        this.currentAuction.highestBidderName = bidder.name;
        await this.currentAuction.save();
        io.emit('newBidUpdate', { newBid: amount, bidderName: bidder.name });
        io.emit('newMessage', { author: 'Auctioneer', text: `💰 New high bid of ₹${amount} from ${bidder.name}!`, type: 'BID' });
    } catch (error) {
        console.error("❌ CRITICAL ERROR updating bid:", error);
        socket.emit('newMessage', { author: 'Auctioneer', text: 'A server error occurred while placing your bid.', type: 'ERROR' });
    }
  }
  async endAuction(io) {
    if (!this.currentAuction) return;
    clearInterval(this.auctionTimer);
    this.currentAuction.status = 'ended';
    let endMessage;
    if (this.currentAuction.highestBidder) {
        this.currentAuction.winner = this.currentAuction.highestBidder;
        await this.currentAuction.save();
        const contract = new Contract({
            farmer: this.currentAuction.seller, buyer: this.currentAuction.winner,
            produce: this.currentAuction.itemName, quantity: parseFloat(this.currentAuction.quantity.split(' ')[0]) || 0,
            price: this.currentAuction.currentBid, terms: `Generated from auction win.`, status: 'pending',
        });
        await contract.save();
        endMessage = { author: 'Auctioneer', text: `SOLD! 🏁 ${this.currentAuction.highestBidderName} wins with a bid of ₹${this.currentAuction.currentBid}. A draft contract has been created.`, type: 'BOT' };
    } else {
        await this.currentAuction.save();
        endMessage = { author: 'Auctioneer', text: `Auction ended for ${this.currentAuction.itemName} with no bids.`, type: 'BOT' };
    }
    io.emit('auctionEnded', { endMessage });
    this.currentAuction = null;
  }
}
module.exports = new AuctionStateManager();