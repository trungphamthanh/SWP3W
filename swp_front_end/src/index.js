import React from 'react';
import ReactDOM from 'react-dom/client';
import PageRouter from './PageRouter/PageRouter';
import App from './App';
import { ServiceContextProvider } from './Context/UseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ServiceContextProvider>
      <PageRouter/>
    </ServiceContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

