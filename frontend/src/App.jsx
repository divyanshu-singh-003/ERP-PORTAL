import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";


function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      
          <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          </Routes>
          <Toaster />
          
          
        
        
      
    </>
  );
}

export default App;
