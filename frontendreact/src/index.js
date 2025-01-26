import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = createRoot(document.getElementById('root')); // Membuat root untuk aplikasi React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Jika ingin memulai pengukuran performa, gunakan fungsi berikut:
// Contohnya: reportWebVitals(console.log)
// Atau kirimkan ke endpoint analitik. Pelajari lebih lanjut: https://bit.ly/CRA-vitals
reportWebVitals();
