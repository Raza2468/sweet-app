import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalStateProvider } from './Context/globaleContext';

import { BrowserRouter as Router } from "react-router-dom"



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);