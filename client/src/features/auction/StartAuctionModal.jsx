import React, { useState, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

const StartAuctionModal = ({ socket, onClose }) => {
  const [formData, setFormData] = useState({ name: '', quantity: '', pricePerUnit: '', duration: '5', minIncrement: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const totalStartingBid = parseFloat(formData.quantity) * parseFloat(formData.pricePerUnit) || 0;

  useEffect(() => {
    const { name, quantity, pricePerUnit, duration, minIncrement } = formData;
    setIsFormValid(
      name.trim().length >= 3 &&
      parseFloat(quantity) > 0 &&
      parseFloat(pricePerUnit) > 0 &&
      parseInt(duration, 10) > 0 &&
      parseInt(duration, 10) <= 60 &&
      parseFloat(minIncrement) > 0
    );
  }, [formData]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    socket.emit('startAuction', {
      name: formData.name, quantity: `${formData.quantity} kg`,
      startingBid: totalStartingBid, duration: parseInt(formData.duration, 10),
      minIncrement: parseFloat(formData.minIncrement),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="relative bg-gray-800 text-white w-full max-w-lg p-8 rounded-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CgClose size={24} /></button>
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-400">Start a New Auction</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
            <input id="name" name="name" value={formData.name} onChange={onChange} placeholder="e.g., Organic Honey" className="input-dark" required />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
            <div className="flex-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-400 mb-1">Total Weight</label>
              <div className="flex items-center">
                <input id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={onChange} placeholder="e.g., 50" className="input-dark rounded-r-none" required />
                <span className="bg-gray-600 text-gray-300 px-4 py-3 rounded-r-lg border border-l-0 border-gray-600">kg</span>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="pricePerUnit" className="block text-sm font-medium text-gray-400 mb-1">Price per kg</label>
              <div className="flex items-center">
                <span className="bg-gray-600 text-gray-300 px-4 py-3 rounded-l-lg border border-r-0 border-gray-600">₹</span>
                <input id="pricePerUnit" name="pricePerUnit" type="number" min="1" value={formData.pricePerUnit} onChange={onChange} placeholder="e.g., 20" className="input-dark rounded-l-none" required />
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-400">Total Starting Bid</p>
            <p className="text-2xl font-bold text-emerald-400">₹{totalStartingBid.toFixed(2)}</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
            <div className="flex-1">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-400 mb-1">Auction Duration</label>
              <div className="flex items-center">
                <input id="duration" name="duration" type="number" min="1" max="60" value={formData.duration} onChange={onChange} placeholder="e.g., 10" className="input-dark rounded-r-none" required />
                <span className="bg-gray-600 text-gray-300 px-4 py-3 rounded-r-lg border border-l-0 border-gray-600">min</span>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="minIncrement" className="block text-sm font-medium text-gray-400 mb-1">Min. Bid Increment</label>
              <div className="flex items-center">
                <span className="bg-gray-600 text-gray-300 px-4 py-3 rounded-l-lg border border-r-0 border-gray-600">₹</span>
                <input id="minIncrement" name="minIncrement" type="number" min="1" value={formData.minIncrement} onChange={onChange} placeholder="e.g., 50" className="input-dark rounded-l-none" required />
              </div>
            </div>
          </div>
          <button type="submit" disabled={!isFormValid} className="form-button w-full pt-4 pb-4">
            Launch Auction
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartAuctionModal;