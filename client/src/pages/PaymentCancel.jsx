import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PaymentCancel = () => {
  const { contractId } = useParams();
  return (
    <div className="text-center p-12">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="text-gray-600 mt-4">Your payment was not processed. You can try again from the contract page.</p>
      <Link to={`/contracts/${contractId}`} className="mt-8 inline-block bg-gray-600 text-white font-bold py-2 px-4 rounded">
        Return to Contract
      </Link>
    </div>
  );
};

export default PaymentCancel;