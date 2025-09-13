import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardData, reset } from '../features/dashboard/dashboardSlice';
import ActionItemsWidget from '../features/dashboard/ActionItemsWidget';
import { FarmerWidgets, BuyerWidgets } from '../features/dashboard/RoleBasedWidgets';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { actionItems, displayWidgets, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center p-8">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        {user && <p className="text-lg text-gray-500 mt-1">Welcome back, {user.name}!</p>}
      </div>
      <ActionItemsWidget items={actionItems} />
      {user.role === 'farmer' ? (
        <FarmerWidgets sales={displayWidgets.recentSales} />
      ) : (
        <BuyerWidgets bids={displayWidgets.winningBids} />
      )}
    </div>
  );
};

export default Dashboard;