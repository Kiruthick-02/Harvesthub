import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg p-4">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;