import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// It's good practice to install and use a nice icon library
// npm install react-icons
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { FaStore, FaQuoteLeft } from 'react-icons/fa';
import { FaRegHandshake } from 'react-icons/fa';

// A reusable component for the large navigation cards
const ActionCard = ({ to, icon, title, description }) => (
  <Link 
    to={to} 
    className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-emerald-800 transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </Link>
);

// A reusable component for the informational boxes
const InfoCard = ({ quote, author }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <FaQuoteLeft className="text-emerald-500 text-3xl mb-4" />
    <p className="text-gray-700 italic mb-4">{quote}</p>
    <p className="text-right font-semibold text-gray-600">- {author}</p>
  </div>
);


const Dashboard = () => {
  // Get the logged-in user's data from the Redux store
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-12">
      {/* --- Welcome Header --- */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        {/* Personalize the welcome message if the user is logged in */}
        {user && <p className="text-lg text-gray-500 mt-1">Welcome back, {user.name}!</p>}
      </div>

      {/* --- Quick Actions Section --- */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ActionCard 
            to="/weather"
            icon={<TiWeatherPartlySunny size={24} />}
            title="Check Weather"
            description="Get the latest weather forecasts to plan your farming activities."
          />
          <ActionCard 
            to="/marketplace"
            icon={<FaStore size={24} />}
            title="Visit Marketplace"
            description="Explore listings or add your own products for sale."
          />
           <ActionCard 
            to="/contracts"
            icon={<FaRegHandshake size={24} />}
            title="Manage Contracts"
            description="View your active and pending contract agreements."
          />
        </div>
      </div>

      {/* --- Farmer's Corner / Informational Section --- */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Farmer's Corner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoCard 
            quote="The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings."
            author="Masanobu Fukuoka"
          />
          <InfoCard 
            quote="To be a farmer is to be a student forever, for there is no end to the variations of the land, the weather, the water, and the seed."
            author="Wendell Berry"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;