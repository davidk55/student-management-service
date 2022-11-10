import './index.css';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import React from 'react';

const rootNode = document.getElementById('root');

if (rootNode) {
  const root = ReactDOM.createRoot(rootNode);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
