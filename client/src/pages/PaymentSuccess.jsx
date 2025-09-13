import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const { contractId } = useParams(); // Get contractId if you pass it in the URL
  return (
    <div className="text-center p-12">
      <h1 className="text-3xl font-bold text-emerald-600">Payment Successful!</h1>
      <p className="text-gray-600 mt-4">Your payment has been processed. The farmer will be notified to ship your product.</p>
      <Link to={`/contracts/${contractId}`} className="mt-8 inline-block bg-emerald-600 text-white font-bold py-2 px-4 rounded">
        View Contract Status
      </Link>
    </div>
  );
};

export default PaymentSuccess;