import React from 'react';

const VersionTimeline = ({ history }) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Contract History</h4>
      <div className="border-l-2 border-emerald-500 pl-4 space-y-4">
        {history.map((version, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[2.35rem] top-1 h-3 w-3 bg-emerald-500 rounded-full"></div>
            <p className="text-sm text-gray-500">{new Date(version.updatedAt).toLocaleString()}</p>
            <p className="text-gray-700">{version.terms}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionTimeline;