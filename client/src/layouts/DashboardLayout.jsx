import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-dark-bg text-light-text">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;