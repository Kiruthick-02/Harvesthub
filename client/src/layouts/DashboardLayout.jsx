import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

// These absolute paths will work correctly after the server is restarted.
import Sidebar from 'components/navigation/Sidebar';
import Header from 'components/navigation/Header';
import ProfileModal from 'components/common/ProfileModal';

const DashboardLayout = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onProfileClick={handleProfileClick} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      {isProfileModalOpen && (
        <ProfileModal onClose={() => setProfileModalOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;