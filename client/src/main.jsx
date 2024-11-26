import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Corrected import for App component
import './index.css';

// Safely get the root element
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
