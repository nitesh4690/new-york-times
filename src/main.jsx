import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { NewsProvider } from './context/NewsContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NewsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NewsProvider>
  </React.StrictMode>
);