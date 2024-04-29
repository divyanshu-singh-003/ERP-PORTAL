import React, { useState } from "react";
import Notice from '../../components/notices/Notice';
import ShowNotice from '../../components/notices/ShowNotice';

import exampleNotices from '../../notices';
import ReplyIcon from "@mui/icons-material/Reply";

import { useAuthContext } from "../../context/AuthContext";

import "./home.scss";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const { authUser } = useAuthContext();



  return (
    <div className="home">
      <div className="intro"><h1>Welcome to ERP PORTAL {authUser.fullName}</h1></div>
      <div className="bottom-box">
        <div className="box time-table">
        <div className="h-full w-full rounded-xl shadow-lg flex flex-col pt-3 ">
          <div className="flex text-center">
          <h1 className="font-bold text-xl w-full text-center ">Time Table</h1>
          </div>
          <div className = "time-image">
          <img src="/timetable.png" alt="" className="icon" />

          </div>
        </div>
        </div>
        <div className ="box notice">
        <div className="h-[17rem] w-full rounded-xl shadow-lg flex flex-col pt-3">
      <div className="flex px-3">
        {open && (
          <ReplyIcon
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        )}
        <h1 className="font-bold text-xl w-full text-center">Notices</h1>
      </div>
      <div className="mx-5 mt-5 space-y-3 overflow-y-auto h-[12rem]">
        {!open ? (
          exampleNotices?.map((notice, idx) => (
            <div
              key={idx}
              onClick={() => {
                setOpen(true);
                setOpenNotice(notice);
              }}
              className=""
            >
              <Notice idx={idx} notice={notice}  />
            </div>
          ))
        ) : (
          <ShowNotice notice={openNotice} />
        )}
      </div>
    </div>

        </div>
      </div>
    </div>
  )
}

export default Home