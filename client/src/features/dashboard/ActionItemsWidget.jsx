import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const ActionItemsWidget = ({ items }) => {
  if (items.length === 0) {
    return null; // Don't show the widget if there's nothing to do
  }

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-r-lg shadow-md">
      <h2 className="text-2xl font-bold flex items-center mb-4">
        <FaBell className="mr-3" />
        Action Required
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="bg-white p-3 rounded-md hover:bg-yellow-50 transition-colors">
            <Link to={`/contracts/${item.contractId}`} className="font-semibold text-gray-700 hover:text-yellow-900">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionItemsWidget;