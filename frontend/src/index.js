import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);