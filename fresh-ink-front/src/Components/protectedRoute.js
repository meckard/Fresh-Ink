import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user)

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect unauthenticated users
  }
  return children; // Render the protected component
};

export default ProtectedRoute;
