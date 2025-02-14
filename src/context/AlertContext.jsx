import React, { createContext, useContext, useState } from 'react';
import Banner from '../components/Banner';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState();

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000); // Hide alert after 4 seconds
  };

  const hideAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && <Banner open={alert} type={alert.type} message={alert.message} onClose={hideAlert} />}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};