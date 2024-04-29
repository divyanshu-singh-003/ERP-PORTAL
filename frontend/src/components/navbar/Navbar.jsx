import React from 'react'
import "./navbar.scss"
import { useAuthContext } from '../../context/AuthContext';
import useLogout from '../../hooks/useLogout';
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { loading, logout } = useLogout();


  const {authUser} =useAuthContext();
  return (
    <div className="navbar">
      <div className="logo">
        <img src="iiitp-erp.png" alt="" className="h-8 w-10 rounded"/>
        <span>IIIT PUNE</span>
      </div>
      <div className="icons">
        {/* <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>{authUser.fullName}</span>
        </div>
        <CiLogout className="w-6 h-6 text-white cursor-pointer" onClick={logout}></CiLogout>
      </div>
    </div>
  );

}

export default Navbar