import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Contracts from './pages/Contracts';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ui/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Route: The first page everyone sees */}
      <Route path="/" element={<Landing />} />

      {/* Authentication Routes: Login and Signup pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Dashboard Routes: Users must be logged in to access these */}
      <Route 
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* The 'index' route makes Dashboard the default page for the /dashboard path */}
        <Route index element={<Dashboard />} /> 
        <Route path="contracts" element={<Contracts />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;