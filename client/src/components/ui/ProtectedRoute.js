import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
    // Select the entire auth state
    const { user, isLoading } = useSelector((state) => state.auth);

    // This handles the initial loading state from Redux Toolkit
    if (isLoading) {
        // You can return a loading spinner here for a better UX
        return <div>Loading...</div>;
    }

    // Case 1: Finished loading, but there is NO user. Redirect to login.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Case 2: User exists, but this route requires a specific role.
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // User does not have the required role, redirect to dashboard.
        return <Navigate to="/dashboard" replace />;
    }

    // Case 3: User exists and has the required role (or no role is required).
    // Render the child component (e.g., DashboardLayout).
    return <Outlet />;
};

export default ProtectedRoute;