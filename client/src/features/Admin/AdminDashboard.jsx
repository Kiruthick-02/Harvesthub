import React from 'react';
import UserApprovalPanel from './UserApprovalPanel';
import DisputeResolutionPanel from './DisputeResolutionPanel';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <UserApprovalPanel />
        <DisputeResolutionPanel />
    </div>
  );
};

export default AdminDashboard;