import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { StoreProvider, createStore } from 'easy-peasy';
import globalStore from './state/globalStore';
import { IGlobalStore } from './interfaces';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore<IGlobalStore>(globalStore);

// TODO: implement real time sync with no high pressure
// // setTimeout(() => {
// const unsubscriber = store.subscribe(() => {
//   const updatedState = store.getState().user;
//   const syncDatabaseWithReduc = async (updatedState: ITask[]) => {
//     const resp = await fetch('/api/task/update', {
//       method: 'POST', headers: {
//         'Content-Type': 'application/json',
//       }, body: JSON.stringify(updatedState),
//     });
//     const res = await resp.json();
//     console.log(res)
//   }

//   function compareArrays(array1: any[], array2: any[]): any[] {
//     const uniqueElements = array1.filter(element => !array2.includes(element));
//     return uniqueElements;
//   }
//   // syncDatabaseWithReduc(updatedState);

// });
// // }, 2000);

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
