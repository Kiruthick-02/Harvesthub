import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Weather from './pages/Weather';
import AuctionPage from './pages/AuctionPage';
import Contracts from './pages/Contracts';
import ContractDetailPage from './pages/ContractDetailPage';

// Import Layouts & Protection
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ui/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auction" element={<AuctionPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contracts/:id" element={<ContractDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;