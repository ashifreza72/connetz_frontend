
// src/routes/Routes.jsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Team from "../pages/Team";
import MainLayout from "../layout/MainLayout";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Integration from "../pages/Integration";
import Subscription from "../pages/Subscription";
import Billing from "../pages/Billing";
import ClientDetails from "../pages/ClientDetails";

// Add placeholder components for missing routes
const TeamLeader = () => <div>Team Leader Page</div>;
const TeamStaff = () => <div>Team Staff Page</div>;
const Profile = () => <div>Profile Page</div>;
const AppSettings = () => <div>App Settings Page</div>;
const ApiSettings = () => <div>API Settings Page</div>;
const UserGuide = () => <div>User Guide Page</div>;
const Support = () => <div>Live Chat Support Page</div>;

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // Or use a loading spinner

  return user ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Team Routes */}
        <Route path="/team" element={<Team />} />
        <Route path="/team/leader" element={<TeamLeader />} />
        <Route path="/team/staff" element={<TeamStaff />} />
        
        {/* Business Tools */}
        <Route path="/integration" element={<Integration />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/billing" element={<Billing />} />
        
        {/* User & Profile */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Settings */}
        <Route path="/settings/app" element={<AppSettings />} />
        <Route path="/settings/api" element={<ApiSettings />} />
        
        {/* Support */}
        <Route path="/guide" element={<UserGuide />} />
        <Route path="/support" element={<Support />} />
        
        {/* Client Details */}
        <Route path="/client-details" element={<ClientDetails />} />
      </Route>

      {/* Smart root redirect */}
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;
