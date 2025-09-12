import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from './marketplaceSlice';

const ListingForm = ({ onFinish }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'produce',
  });
  const dispatch = useDispatch();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createListing(formData));
    onFinish(); // Close modal
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gray-800">Create New Listing</h3>
      <input name="title" placeholder="Listing Title" onChange={onChange} value={formData.title} className="input-style" required />
      <textarea name="description" placeholder="Detailed Description" onChange={onChange} value={formData.description} className="input-style h-28" required></textarea>
      <input name="price" type="number" placeholder="Price ($)" onChange={onChange} value={formData.price} className="input-style" required />
      <select name="category" onChange={onChange} value={formData.category} className="input-style bg-white">
        <option value="produce">Surplus Produce</option>
        <option value="equipment">Used Equipment</option>
      </select>
      <button type="submit" className="form-button w-full">Post Listing</button>
    </form>
  );
};

export default ListingForm;