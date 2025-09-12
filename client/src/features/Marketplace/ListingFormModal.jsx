import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from './marketplaceSlice'; // We use the marketplace slice action
import { CgClose } from 'react-icons/cg';

const ListingFormModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'produce', // Default category
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.description) {
      alert('Please fill out all required fields.');
      return;
    }
    dispatch(createListing(formData));
    alert('Your product has been listed on the marketplace!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center" onClick={onClose}>
      <div className="relative bg-gray-800 text-white w-full max-w-2xl p-8 rounded-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CgClose size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6">Add a New Product to Marketplace</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Product Name (e.g., Organic Honey)"
            className="input-style"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Describe your product, its quality, and availability..."
            rows="4"
            className="input-style"
            required
          ></textarea>
          <div className="flex space-x-4">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              placeholder="Price ($ per unit/kg)"
              className="input-style w-1/2"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="input-style bg-gray-700 w-1/2"
            >
              <option value="produce">Produce</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            List Product
          </button>
        </form>
      </div>
    </div>
  );
};

// Ensure this class is in your global `index.css` file
/*
.input-style {
  @apply w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white;
}
*/
export default ListingFormModal;