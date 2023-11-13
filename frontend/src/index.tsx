import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { StoreProvider, createStore } from 'easy-peasy';
import globalStore from './state/globalStore';
import { IGlobalStore } from './interfaces';
import { enableMapSet } from 'immer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore<IGlobalStore>(globalStore);

// Call enableMapSet() to enable the Map and Set plugins
enableMapSet();

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
