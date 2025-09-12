import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import ProfileModal from '../components/common/ProfileModal';

const DashboardLayout = () => {
  // State to manage the modal's visibility
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  // We pass this function down to the Header, so it can open the modal
  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pass the function as a prop to the Header */}
        <Header onProfileClick={handleProfileClick} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Conditionally render the modal here, outside the main flow */}
      {isProfileModalOpen && (
        <ProfileModal onClose={() => setProfileModalOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;