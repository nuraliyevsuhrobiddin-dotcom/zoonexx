
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <style>{`
      html, body, #root { height: 100%; margin: 0; overflow: hidden; background-color: #f1f5f9; }
      html, body, #root { height: 100%; margin: 0; overflow: hidden; }
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .fade-in { animation: fadeIn 0.4s ease-out; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .agro-gradient { background: linear-gradient(135deg, #059669 0%, #047857 100%); }
      .gold-gradient { background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); }
    `}</style>
    <App />
  </React.StrictMode>
);
