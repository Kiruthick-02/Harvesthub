import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContracts, reset } from './contractsSlice';

const ContractList = () => {
  const dispatch = useDispatch();
  const { contracts, isLoading, isError, message } = useSelector((state) => state.contracts);

  useEffect(() => {
    dispatch(getContracts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) return <div>Loading Products...</div>;
  if (isError) return <div>Error: {message}</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Products</h3>
      <div className="space-y-4">
        {contracts.length > 0 ? (
          contracts.map((contract) => (
            <div key={contract._id} className="border p-4 rounded-lg hover:shadow-lg transition-shadow bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-emerald-700">{contract.produce}</p>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
              </div>
              <p className="text-gray-600">Quantity: {contract.quantity} kg</p>
              <p className="text-gray-600">Price: ${contract.price}/kg</p>
              <p className="text-sm text-gray-500 mt-2">Buyer: {contract.buyer.name}</p>
            </div>
          ))
        ) : (
          <p>You have no Products yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContractList;