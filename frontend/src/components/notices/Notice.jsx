import React, { useState } from "react";
import "./current.scss"

const Notice = ({ idx, notice }) => {
  return (
     
      <div className="flex shadow-md py-2 px-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200 cursor-pointer h-10 current_notice">
        ⚫
        <h1 className="font-bold ml-3 overflow-hidden text-ellipsis w-[15rem]">
          {notice.topic}
          {notice.topic}
          {notice.topic}
          {notice.topic}
          {notice.topic}
          {notice.topic}
        </h1>
        <p className="text-ellipsis w-[25rem] overflow-hidden">
          {notice.content}
        </p>
      </div>
    
  );
};

export default Notice;