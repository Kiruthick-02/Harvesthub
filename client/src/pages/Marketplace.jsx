import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListingList from '../features/Marketplace/ListingList';
import ListingFormModal from '../features/Marketplace/ListingFormModal';
import { FaPlus } from 'react-icons/fa';

const Marketplace = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // --- ADD THIS DEBUGGING LINE ---
  console.log('USER OBJECT IN MARKETPLACE:', user);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Marketplace</h1>
        
        {/* The condition we are debugging */}
        {user && user.role === 'farmer' && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <FaPlus className="mr-2" />
            Add New Product
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <ListingList />
      </div>
      
      {isModalOpen && <ListingFormModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Marketplace;