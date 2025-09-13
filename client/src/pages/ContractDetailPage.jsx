import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getContractById, updateContractStatus, reset } from '../features/contracts/contractsSlice';
import VersionTimeline from '../features/contracts/VersionTimeline';

const ContractDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { activeContract, detailIsLoading, isError, message } = useSelector((state) => state.contracts);

  useEffect(() => {
    if (id) {
      dispatch(getContractById(id));
    }
    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);
  
  const handleStatusUpdate = (newStatus, confirmationMessage) => {
    if (window.confirm(confirmationMessage || 'Are you sure you want to proceed?')) {
      dispatch(updateContractStatus({ contractId: id, status: newStatus }));
    }
  };

  if (detailIsLoading) return <div className="text-center p-8">Loading Contract Details...</div>;
  if (isError) return <div className="text-red-500 p-4 bg-red-100 rounded-lg">Error: {message}</div>;
  if (!activeContract) return <div>No contract data found.</div>;

  const isUserTheBuyer = user?._id === activeContract.buyer._id;
  const isUserTheFarmer = user?._id === activeContract.farmer._id;

  return (
    <div className="space-y-8 animate-fade-in">
      <Link to="/dashboard" className="text-emerald-600 hover:underline font-semibold">&larr; Back to Dashboard</Link>
      <h1 className="text-4xl font-bold text-gray-800">Contract Details</h1>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Status</h2>
        <VersionTimeline currentStatus={activeContract.status} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Agreement Details</h3>
          <p><strong>Product:</strong> {activeContract.produce}</p>
          <p><strong>Quantity:</strong> {activeContract.quantity} kg</p>
          <p><strong>Total Price:</strong> ₹{activeContract.price}</p>
          <p className="mt-4"><strong>Terms:</strong> {activeContract.terms}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Parties Involved</h3>
          <p><strong>Farmer:</strong> {activeContract.farmer.name} ({activeContract.farmer.email})</p>
          <p><strong>Buyer:</strong> {activeContract.buyer.name} ({activeContract.buyer.email})</p>
        </div>
      </div>
      
      {/* --- ACTION BUTTONS & STATUS MESSAGES --- */}
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        {/* Buyer's Action: Pay */}
        {isUserTheBuyer && activeContract.status === 'pending' && (
            <button 
              onClick={() => handleStatusUpdate('awaiting_shipment', 'Proceed with payment?')} 
              className="form-button"
            >
                Proceed to Payment
            </button>
        )}

        {/* Farmer's Action: Ship */}
        {isUserTheFarmer && activeContract.status === 'awaiting_shipment' && (
            <button 
              onClick={() => handleStatusUpdate('shipped', 'Confirm that you have shipped this item?')} 
              className="form-button"
            >
                Mark as Shipped
            </button>
        )}
        
        {/* Buyer's Action: Confirm Delivery */}
        {isUserTheBuyer && activeContract.status === 'shipped' && (
            <button 
              onClick={() => handleStatusUpdate('completed', 'Confirm that you have received the delivery?')} 
              className="form-button"
            >
                Confirm Delivery
            </button>
        )}

        {/* Final "Completed" State Message */}
        {activeContract.status === 'completed' && (
            <div className="text-center">
                <h3 className="text-2xl font-bold text-emerald-600">Transaction Complete!</h3>
                <p className="text-gray-600 mt-2">This contract has been successfully fulfilled.</p>
            </div>
        )}
        
        <p className="text-sm text-gray-500 mt-4">
          The contract status will update for both parties once an action is taken.
        </p>
      </div>
    </div>
  );
};

export default ContractDetailPage;