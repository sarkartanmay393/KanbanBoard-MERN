import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider, createStore } from 'easy-peasy';
import globalStore from './state/globalStore';
import { GlobalStore } from './interfaces';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore<GlobalStore>(globalStore);


root.render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
