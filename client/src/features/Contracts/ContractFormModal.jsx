import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContract } from './contractsSlice';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';

const ContractFormModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    buyer: '', // This will hold the selected buyer's ID
    produce: '',
    quantity: '',
    price: '',
    terms: '',
  });

  const [buyers, setBuyers] = useState([]);
  const [isLoadingBuyers, setIsLoadingBuyers] = useState(false);

  // Fetch the list of all buyers when the modal is opened
  useEffect(() => {
    const fetchBuyers = async () => {
      setIsLoadingBuyers(true);
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get('/api/users/buyers', config);
        setBuyers(data);
      } catch (error) {
        console.error('Failed to fetch buyers list', error);
        alert('Could not load the list of buyers. Please try again.');
      }
      setIsLoadingBuyers(false);
    };

    fetchBuyers();
  }, [user.token]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.buyer) {
      alert('You must select a buyer to create a contract.');
      return;
    }
    dispatch(createContract(formData));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center" onClick={onClose}>
      <div className="relative bg-gray-800 text-white w-full max-w-2xl p-8 rounded-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CgClose size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6">Create a New Contract</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="buyer" className="block text-sm font-medium text-gray-400 mb-1">Select a Buyer</label>
            <select
              name="buyer"
              id="buyer"
              value={formData.buyer}
              onChange={onChange}
              className="input-style bg-gray-700"
              required
            >
              <option value="" disabled>
                {isLoadingBuyers ? 'Loading buyers...' : '--- Choose a buyer to send the contract to ---'}
              </option>
              {buyers.map((buyer) => (
                <option key={buyer._id} value={buyer._id}>
                  {buyer.name}
                </option>
              ))}
            </select>
          </div>
          <input type="text" name="produce" value={formData.produce} onChange={onChange} placeholder="Produce Name (e.g., Organic Tomatoes)" className="input-style" required />
          <div className="flex space-x-4">
            <input type="number" name="quantity" value={formData.quantity} onChange={onChange} placeholder="Quantity (in kg)" className="input-style w-1/2" required />
            <input type="number" name="price" value={formData.price} onChange={onChange} placeholder="Price per kg ($)" className="input-style w-1/2" required />
          </div>
          <textarea name="terms" value={formData.terms} onChange={onChange} placeholder="Enter contract terms, delivery schedule, etc..." rows="4" className="input-style" required></textarea>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Send Contract Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContractFormModal;