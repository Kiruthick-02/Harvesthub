import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContract } from './contractsSlice';

const ContractForm = ({ onFinish }) => {
  const [formData, setFormData] = useState({
    buyer: '', // This should be a user ID, maybe from a dropdown
    produce: '',
    quantity: '',
    price: '',
    terms: '',
  });
  const dispatch = useDispatch();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createContract(formData));
    onFinish(); // Close the modal
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-bold">Add a New Product</h3>
      {/* In a real app, you'd have a searchable dropdown for buyers */}
      <input name="buyer" placeholder="Buyer User ID" onChange={onChange} value={formData.buyer} className="input-style" />
      <input name="produce" placeholder="Produce (e.g., Tomatoes)" onChange={onChange} value={formData.produce} className="input-style" />
      <input name="quantity" type="number" placeholder="Quantity (kg)" onChange={onChange} value={formData.quantity} className="input-style" />
      <input name="price" type="number" placeholder="Price ($ per kg)" onChange={onChange} value={formData.price} className="input-style" />
      <textarea name="terms" placeholder="Contract Terms..." onChange={onChange} value={formData.terms} className="input-style h-24"></textarea>
      <button type="submit" className="form-button">Create Product</button>
    </form>
  );
};

export default ContractForm;