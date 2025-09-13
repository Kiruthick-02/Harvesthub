import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// --- THIS IS THE CRITICAL FIX ---
// Import the `updateUserProfile` async thunk from your auth slice.
import { updateUserProfile } from '../../features/auth/authSlice'; 
import { CgClose } from 'react-icons/cg';

const ProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Now this dispatch call will work correctly.
    dispatch(updateUserProfile(formData));
    alert('Profile updated successfully!');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative bg-gray-800 text-white w-full max-w-lg p-8 rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <CgClose size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6">My Profile</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={onChange}
              className="input-dark w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={onChange}
              className="input-dark w-full"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-400 mb-1">Role</label>
            <input
              type="text"
              name="role"
              id="role"
              value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
              disabled
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;