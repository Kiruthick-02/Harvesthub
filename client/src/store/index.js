import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// Import the 'store' that you just configured and exported
import { store } from './store/store'; 
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* The Provider component makes the Redux store available to any nested components */}
    {/* It MUST receive a valid store object via the `store` prop */}
    <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);