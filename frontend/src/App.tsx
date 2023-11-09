import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

function App() {
  const handleGoBack = () => {
    window.history.back();
  }

  return (
    <div className="overflow-hidden w-[100vw] h-[100vh] flex flex-col p-4">
      <img className="absolute left-8 top-6 cursor-pointer" width={24} alt="" onClick={handleGoBack} src="https://cdn1.iconfinder.com/data/icons/duotone-essentials/24/chevron_backward-512.png" />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
