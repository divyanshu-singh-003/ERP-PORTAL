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
import Profile from './pages/profile/Profile';
import UpdateBody from './pages/profile/updatebody/UpdateBody';
import PasswordChange from './pages/profile/passwordchange/PasswordChange';
import PostImage from './pages/postitem/PostImage';
import "./styles/global.scss"
import ShowAll from './pages/postitem/ShowAll';

import ItemDetails from './components/item/ItemDetails';

import CategoryItems from './components/item/CategoryItems';

import UserCardDetails from './components/item/UserCardDetails';

import CabSharing from './pages/cabs/CabSharing';

import AdminHome from './pages/admin/AdminHome';

import NavbarAdmin from './components/navbar/NavbarAdmin';


import MenuAdmin from './components/menu/MenuAdmin';


import MarksUpload from './pages/admin/marksUpload/MarksUpload';

import MarksCSV from './pages/admin/marksUpload/MarksCSV';

import AdminAttendanceCSV from './pages/admin/attendance/AdminAttendanceCSV';

import UploadStudent from './pages/admin/student/UploadStudent';


// const queryClient = new QueryClient();


function App() {
  const { authUser } = useAuthContext();

  const found = true;

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
  const Layout2 = () => {
    return (
      <div className="main">
        <NavbarAdmin />
        <div className="container">
          <div className="menuContainer">
            <MenuAdmin />
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
          <Route path='/profile' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<Profile />}/>
          </Route>
          <Route path='/updatestu' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<UpdateBody />}/>
          </Route>
          <Route path='/password' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<PasswordChange />}/>
          </Route>
          <Route path='/postitem' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<PostImage />}/>
          </Route>
          <Route path='/item/:type' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<CategoryItems />}/>
          </Route>
          <Route path='/showall' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<ShowAll />}/>
          </Route>

          <Route path='/lfitem/:id' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<ItemDetails />}/>
          </Route>
          <Route path='/useritem/:id' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<UserCardDetails />}/>
          </Route>
          <Route path='/cabs' element={authUser ? <Layout /> : <Navigate to={"/login"} />}>
            <Route index element ={<CabSharing/>}/>
          </Route>

          <Route path='/admin' element={ found ? <Layout2 /> : <Navigate to={"/login"} />}>
            <Route index element ={<AdminHome/>}/>
          </Route>

          <Route path='/admin/marks' element={ found ? <Layout2 /> : <Navigate to={"/login"} />}>
            <Route index element ={<MarksUpload/>}/>
          </Route>
          <Route path='/admin/markscsv' element={ found ? <Layout2 /> : <Navigate to={"/login"} />}>
            <Route index element ={<MarksCSV/>}/>
          </Route>
          <Route path='/admin/attendance' element={ found ? <Layout2 /> : <Navigate to={"/login"} />}>
            <Route index element ={<AdminAttendanceCSV/>}/>
          </Route>
          <Route path='/admin/uploadstudent' element={ found ? <Layout2 /> : <Navigate to={"/login"} />}>
            <Route index element ={<UploadStudent/>}/>
          </Route>

          
          
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          </Routes>
          <Toaster />
    </>
  );
}

export default App;
