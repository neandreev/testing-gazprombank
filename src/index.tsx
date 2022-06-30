import React from 'react';
import ReactDOM from 'react-dom/client';

import { StoreContextProvider } from './context';
import App from './components/App/App';

import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/700.css"
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </React.StrictMode>
);
