// // src/routes/Routes.jsx
// import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard";
// import Team from "../pages/Team";
// import MainLayout from "../layout/MainLayout";
// import ForgotPassword from "../pages/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword";

// const ProtectedRoute = () => {
//   const { user } = useAuth();
//   return user ? <MainLayout><Outlet /></MainLayout> : <Navigate to="/login" />;
// };

// const AppRoutes = () => {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//       <Route path="/register" element={<Register />} />
       
       

//       {/* Protected Routes (inside MainLayout) */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/team" element={<Team />} />
//         <Route path="/" element={<Navigate to="/dashboard" />} />
//       </Route>

//       {/* Catch-all redirect */}
//       <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
//     </Routes>
//   );
// };

// export default AppRoutes;




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
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/team" element={<Team />} />
    <Route path="/integration" element={<Integration />} />
    <Route path="/subscription" element={<Subscription />} />
    <Route path="/billing" element={<Billing />} />
  </Route>

  {/* Smart root redirect */}
  <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

  {/* Catch-all */}
  <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
</Routes>
  
  );
};


export default AppRoutes;
