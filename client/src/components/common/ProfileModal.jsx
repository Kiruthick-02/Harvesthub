import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// We need a new slice action to handle profile updates.
import { updateUserProfile, reset } from '../../features/auth/authSlice'; 
import { CgClose } from 'react-icons/cg';

// The `onClose` prop is a function passed from the parent to close the modal.
const ProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // When the component loads, populate the form with the current user's data.
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
    dispatch(updateUserProfile(formData));
    // Optional: Add a success message/toast here.
    alert('Profile updated successfully!');
    onClose(); // Close the modal after submission.
  };

  return (
    // Modal Overlay: covers the whole screen
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
      onClick={onClose} // Close modal if background is clicked
    >
      {/* Modal Content: stops the click from propagating to the overlay */}
      <div 
        className="relative bg-gray-800 text-white w-full max-w-lg p-8 rounded-2xl shadow-lg transform transition-all"
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={onChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={onChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-400 mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} // Capitalize first letter
              disabled // Role is not editable
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