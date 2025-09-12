import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

// The Header now receives an `onProfileClick` function from its parent layout
const Header = ({ onProfileClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200 shadow-sm h-20">
      <div /> {/* Placeholder for alignment */}
      <div className="flex items-center">
        {user ? (
          <div className="relative">
            {/* This button now calls the function passed from the layout */}
            <button
              onClick={onProfileClick} // <-- CRITICAL CHANGE HERE
              className="relative z-10 h-10 w-10 overflow-hidden rounded-full shadow focus:outline-none flex items-center justify-center bg-emerald-500 text-white font-bold text-lg"
              title="Open Profile"
            >
              {(user.name && user.name.charAt(0).toUpperCase()) || ''}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;