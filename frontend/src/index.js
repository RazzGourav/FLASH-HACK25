import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<App />} />
       <Route path="/admin" element={<AdminLogin />} />
       <Route path="/admin-panel" element={<AdminPanel />} />
     </Routes>
   </BrowserRouter>
  </React.StrictMode>
);
