import React, { useContext } from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import { DevicesProvider } from '../hooks/useDevices';
import { LocationsProvider } from '../context/LocationContext';

const ProtectedRoutes = ({ children, roles }) => {

  const { user } = useAuth();

  let location = useLocation();

  if (!(roles?.includes?.(user?.role))) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }
  if (!user?.ssid || !user?.trackingItem) {
    return <Navigate to="/credentials" state={{ from: location }} replace />
  }
  
  return (
    <DevicesProvider>
      <LocationsProvider>
        {children}
      </LocationsProvider>
    </DevicesProvider>
  )
};

export default ProtectedRoutes;