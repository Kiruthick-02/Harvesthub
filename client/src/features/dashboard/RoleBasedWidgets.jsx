import React from 'react';

export const FarmerWidgets = ({ sales }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Sales</h2>
    <div className="bg-white p-6 rounded-xl shadow-md">
      {sales.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {sales.map((sale, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{sale.itemName}</p>
                <p className="text-sm text-gray-500">Sold to: {sale.buyerName}</p>
              </div>
              <p className="font-bold text-emerald-600">₹{sale.finalPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You have no completed sales yet.</p>
      )}
    </div>
  </div>
);

export const BuyerWidgets = ({ bids }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Winning Bids</h2>
    <div className="bg-white p-6 rounded-xl shadow-md">
       {bids.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {bids.map((bid, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{bid.itemName}</p>
                <p className="text-sm text-gray-500">Purchased from: {bid.farmerName}</p>
              </div>
              <p className="font-bold text-emerald-600">₹{bid.finalPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You have no recently won auctions.</p>
      )}
    </div>
  </div>
);