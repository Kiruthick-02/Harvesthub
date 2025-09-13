import React from 'react';
import { useSelector } from 'react-redux';

/**
 * The Header component for the main dashboard layout.
 * It displays the top bar of the application.
 * Its primary interactive element is the user profile icon, which
 * triggers a function passed down from the parent layout to open a modal.
 * @param {object} props - The component props.
 * @param {Function} props.onProfileClick - The function to call when the profile icon is clicked.
 */
const Header = ({ onProfileClick }) => {
  // Get the current user from the Redux store to display their initial.
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex items-center justify-end px-6 py-4 bg-white border-b-2 border-gray-200 shadow-sm h-20">
      {/* Main content of the header is aligned to the right */}
      <div className="flex items-center">
        {/* We only render the profile icon if a user is logged in */}
        {user && (
          <div className="relative">
            <button
              onClick={onProfileClick} // Calls the function from DashboardLayout
              className="relative z-10 block h-10 w-10 overflow-hidden rounded-full shadow focus:outline-none flex items-center justify-center bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition-colors"
              title="Open Profile"
            >
              {/* Safely get the first initial of the user's name */}
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;