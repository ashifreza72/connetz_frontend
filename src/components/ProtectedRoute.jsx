import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
     logout();  
            
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;


// ---------------------------------------------sir

// import { useAuth } from './AuthContext';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     // Return a loading spinner or null while we wait
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     // Redirect to login only if not loading and no user exists
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };


// src/routes/ProtectedRoute.jsx
 



// // src/routes/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return null; // Or show a loader/spinner

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
