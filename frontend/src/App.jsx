import React from 'react';
import { Route, Routes, Navigate ,Outlet} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Users from './pages/users/Users';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Marks from './pages/marks/Marks';
import Attendance from './pages/attendance/Attendance';
import "./styles/global.scss"

// const queryClient = new QueryClient();


function App() {
  const { authUser } = useAuthContext();

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet/>
          </div>
        </div>
        <Footer />
      </div>
    );
  };


  return (
    <>
      
          <Routes>
          <Route path='/' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<Home />}/>
          </Route>
          <Route path='/users' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<Users />}/>
          </Route>
          <Route path='/marks' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<Marks />}/>
          </Route>
          <Route path='/attendance' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<Attendance />}/>
          </Route>
          
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          </Routes>
          <Toaster />
    </>
  );
}

export default App;
