import React from "react";
const Data = ({ label, value }) => {
  return (
    <div className="grid grid-cols-2  gap-10">
      <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">{label} :</h1>
      <h2 className="font-normal text-lg bg-gray-100 shadow-xl px-2 py-1 rounded-lg text-black">
        {value}
      </h2>
    </div>
  );
};

export default Data;