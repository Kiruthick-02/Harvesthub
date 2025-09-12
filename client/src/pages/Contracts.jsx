import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ContractList from '../features/Contracts/ContractList';
import ContractFormModal from '../features/Contracts/ContractFormModal';
import { FaPlus } from 'react-icons/fa';

const Contracts = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Contract Management</h1>
        
        {/* --- CONDITIONAL BUTTON for Farmers --- */}
        {user && user.role === 'farmer' && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <FaPlus className="mr-2" />
            Create New Contract
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <ContractList />
      </div>
      
      {isModalOpen && <ContractFormModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Contracts;