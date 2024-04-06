import React from "react";

import "./current.scss"

const ShowNotice = ({ notice }) => {
  return (
    <div className="flex flex-col space-y-3  text-black  current_show">
      <div className="flex justify-between">
        <h1>
          <span className="font-bold">From: </span>
          {notice.from}
        </h1>
        <h1>{notice.date}</h1>
      </div>
      <h1 className="self-center font-semibold text-lg">{notice.topic}</h1>
      <p className="max-w-[50rem] overflow-x-hidden overflow-y-auto h-[7rem]">
        {notice.content}
      </p>
    </div>
  );
};

export default ShowNotice;