import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- Import Pages ---
import Landing from './pages/Landing';
import Login from './pages/Login';
// CORRECTED: The typo './pages. Signup' is now correctly './pages/Signup'
import Signup from './pages/Signup'; 
import Dashboard from './pages/Dashboard';
import Contracts from './pages/Contracts';
import Marketplace from './pages/Marketplace';
import AdminDashboard from './features/Admin/AdminDashboard';

// --- Import Layouts & Protection ---
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ui/ProtectedRoute';
import Weather from './pages/Weather'; // Import the new page


function App() {
  return (
    <Routes>
      {/* === Public Routes === */}
      <Route path="/" element={<Landing />} />

      {/* Authentication Layout Route for Login and Signup */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* === Protected Routes for Standard Users (Farmers/Buyers) === */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/weather" element={<Weather />} /> {/* <-- ADD THIS LINE */}

        </Route>
      </Route>

      {/* === Protected Route for Admins Only === */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
      
      {/* Optional: A catch-all 404 Not Found route */}
      <Route path="*" element={
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <h2>404 - Page Not Found</h2>
        </div>
      } />
    </Routes>
  );
}

export default App;