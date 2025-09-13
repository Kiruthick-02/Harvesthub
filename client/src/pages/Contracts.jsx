import React from 'react';
// Using a relative path to be safe
import ContractList from '../features/contracts/ContractList';

const Contracts = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">My Contracts</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <ContractList />
      </div>
    </div>
  );
};

export default Contracts;