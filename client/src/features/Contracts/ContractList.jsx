import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getContracts, reset } from './contractsSlice';

const StatusBadge = ({ status }) => { /* ... see previous responses ... */ };

const ContractList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { contracts, listIsLoading, isError, message } = useSelector((state) => state.contracts);

  useEffect(() => {
    dispatch(getContracts());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  if (listIsLoading) return <div>Loading Contracts...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div className="space-y-4">
      {contracts.length > 0 ? (
        contracts.map((contract) => (
          <Link key={contract._id} to={`/contracts/${contract._id}`} className="block border p-4 rounded-lg hover:shadow-lg hover:border-emerald-500 transition-all bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg text-emerald-700">{contract.produce}</p>
              <StatusBadge status={contract.status} />
            </div>
            <div className="text-sm text-gray-500 mt-2 flex justify-between">
              <span>With: {user.role === 'farmer' ? contract.buyer.name : contract.farmer.name}</span>
              <span>Total: ₹{contract.price}</span>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 py-8">You have no contracts yet.</p>
      )}
    </div>
  );
};

export default ContractList;