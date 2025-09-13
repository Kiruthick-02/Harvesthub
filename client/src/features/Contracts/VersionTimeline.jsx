import React from 'react';

/**
 * This component visually represents the current status of a contract
 * as a series of steps in a timeline.
 * @param {object} props - The component props.
 * @param {string} props.currentStatus - The current status key (e.g., 'pending', 'shipped').
 */
const VersionTimeline = ({ currentStatus }) => {
  // Define the sequence and labels for each step in the contract's lifecycle
  const statuses = [
    { key: 'pending', label: 'Awaiting Payment' },
    { key: 'awaiting_shipment', label: 'Awaiting Shipment' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'completed', label: 'Completed' },
  ];

  // Find the numerical index of the current status to determine progress
  const currentStatusIndex = statuses.findIndex(s => s.key === currentStatus);

  return (
    <div className="w-full py-4 px-2">
      <div className="flex items-center">
        {statuses.map((status, index) => (
          <React.Fragment key={status.key}>
            {/* A single step (node) in the timeline */}
            <div className="flex flex-col items-center text-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors duration-500 ${
                  index <= currentStatusIndex ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                {/* Show a checkmark for completed steps, or the number for current/future steps */}
                {index < currentStatusIndex ? '✓' : index + 1}
              </div>
              <p 
                className={`mt-2 font-semibold text-sm w-24 transition-colors duration-500 ${
                  index <= currentStatusIndex ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                {status.label}
              </p>
            </div>

            {/* The connecting line between steps */}
            {index < statuses.length - 1 && (
              <div 
                className={`flex-auto border-t-4 transition-colors duration-500 ${
                  index < currentStatusIndex ? 'border-emerald-600' : 'border-gray-300'
                }`} 
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VersionTimeline;