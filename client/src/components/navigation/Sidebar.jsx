import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Icon = ({ path }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} /></svg>
);

const Sidebar = () => {
  const dispatch = useDispatch();

  const navLinkClasses = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary-green text-white font-bold'
        : 'text-secondary-text hover:bg-dark-bg hover:text-light-text'
    }`;

  return (
    <div className="w-64 bg-dark-card p-4 flex flex-col">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-light-text">
          <span className="text-primary-green">Harvest</span>Hub
        </h1>
      </div>
      <nav className="flex-1 mt-8 space-y-2">
        {/* Updated NavLink 'to' paths */}
        <NavLink to="/dashboard" className={navLinkClasses} end>
          <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard/contracts" className={navLinkClasses}>
            <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            <span>Contracts</span>
        </NavLink>
        <NavLink to="/dashboard/marketplace" className={navLinkClasses}>
            <Icon path="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
            <span>Marketplace</span>
        </NavLink>
        <NavLink to="/dashboard/profile" className={navLinkClasses}>
            <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <span>Profile</span>
        </NavLink>
      </nav>
      <div className="mt-auto">
        <button onClick={() => dispatch(logout())} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-secondary-text hover:bg-red-500/20 hover:text-light-text transition-colors duration-200">
           <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
           <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;