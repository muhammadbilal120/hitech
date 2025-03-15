import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import App from './App.jsx';
import './index.css';

// Set the app element for react-modal
ReactModal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
