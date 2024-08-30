import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter> {/* Wrap your app with BrowserRouter */}
    <App />
  </BrowserRouter>
);
