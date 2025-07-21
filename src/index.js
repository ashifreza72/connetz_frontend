import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 
import { AuthProvider } from './context/AuthContext'; // ✅ Import AuthProvider

import "@fontsource/inter"; // Loads regular weight
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       
      <AuthProvider>
        <App />
      </AuthProvider>
    
  </React.StrictMode>
);

reportWebVitals();
