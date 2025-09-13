import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { RxDashboard } from 'react-icons/rx';
import { FaStore, FaGavel } from 'react-icons/fa'; // <-- CHANGE ICON IMPORT
import { FiLogOut } from 'react-icons/fi';
import { TiWeatherPartlySunny } from 'react-icons/ti';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const linkStyles = "flex items-center px-4 py-3 text-gray-200 rounded-lg transition-colors duration-300";
  const activeLinkStyles = "bg-emerald-700 text-white font-bold";
  const inactiveLinkStyles = "hover:bg-emerald-800 hover:text-white";

  return (
    <div className="hidden md:flex flex-col w-64 bg-emerald-900 text-white">
      <div className="flex items-center justify-center h-20 border-b border-emerald-800">
        <h1 className="text-2xl font-bold tracking-wider">HarvestHub</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
          <RxDashboard className="h-5 w-5 mr-3" />
          Dashboard
        </NavLink>
        
        {/* --- THIS IS THE MODIFIED LINK --- */}
        <NavLink to="/auction" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
          <FaGavel className="h-5 w-5 mr-3" />
          Auction Room
        </NavLink>

        <NavLink to="/marketplace" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
          <FaStore className="h-5 w-5 mr-3" />
          Marketplace
        </NavLink>
        <NavLink to="/weather" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
          <TiWeatherPartlySunny className="h-5 w-5 mr-3" />
          Weather
        </NavLink>
        
        {user && user.role === 'admin' && (
           <NavLink to="/admin" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
             <RxDashboard className="h-5 w-5 mr-3" />
             Admin Panel
           </NavLink>
        )}
      </nav>
      <div className="px-4 py-4">
        <button onClick={handleLogout} className={`${linkStyles} w-full text-left bg-emerald-800 hover:bg-red-600`}>
          <FiLogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;