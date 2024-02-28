import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterConfig from './routes/routes';  // replace

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);
