import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AlertProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
