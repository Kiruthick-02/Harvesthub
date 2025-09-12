import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDisputedContracts, resolveDispute, reset } from './adminSlice';

const DisputeResolutionPanel = () => {
  const dispatch = useDispatch();
  const { disputes, isLoading, isError, message } = useSelector((state) => state.admin);

  useEffect(() => {
    // Fetch disputed contracts when the component mounts
    dispatch(getDisputedContracts());

    // Cleanup: reset the admin state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleResolve = (contractId, resolutionStatus) => {
    if (window.confirm(`Are you sure you want to resolve this dispute as "${resolutionStatus}"?`)) {
      dispatch(resolveDispute({ contractId, resolutionStatus }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Dispute Resolution</h3>
        <p>Loading disputed contracts...</p>
      </div>
    );
  }
  
  if (isError) {
      return <p className="text-red-500">Error: {message}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Dispute Resolution</h3>
      {disputes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produce</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parties Involved</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disputed On</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {disputes.map((contract) => (
                <tr key={contract._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contract.produce}</div>
                    <div className="text-sm text-gray-500">{contract._id}</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Farmer: {contract.farmer.name}</div>
                    <div className="text-sm text-gray-900">Buyer: {contract.buyer.name}</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(contract.updatedAt)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleResolve(contract._id, 'completed')}
                      className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => handleResolve(contract._id, 'cancelled')}
                      className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      Mark as Cancelled
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">There are currently no disputed contracts.</p>
      )}
    </div>
  );
};

export default DisputeResolutionPanel;