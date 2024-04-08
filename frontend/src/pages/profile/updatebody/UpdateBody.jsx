/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from "react";
import useGetSingleStudent from "../../../hooks/getStudentDetails";

import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import FileBase from "react-file-base64";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Spinner from 'C:/Users/divya/OneDrive/Desktop/ERP/frontend/utils/Spinner.jsx';
import updateStudent from "../../../hooks/updateStudentBody";
import { useAuthContext } from "../../../context/AuthContext";

const UpdateBody = () => {
  const {authUser}=useAuthContext();
  const navigate = useNavigate();
  const { user } = useGetSingleStudent();
  const departments = ["CSE", "ECE"];

  
  const { handleSubmit, isLoading, error } = updateStudent(); 
  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: authUser.email,
    department: "",
    contactNumber: "",
    avatar: "",
    batch: "",
    year: "",
    motherName: "",
    fatherName: "",
    fatherContactNumber: "",
    section: "",
  });


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      value.name === "" &&
      value.dob === "" &&
      value.department === "" &&
      value.contactNumber === "" &&
      value.avatar === "" &&
      value.batch === "" &&
      value.year === "" &&
      value.motherName === "" &&
      value.fatherName === "" &&
      value.fatherContactNumber === "" &&
      value.section === ""
    ) {
      alert("Enter atleast one value");
      

    }
    else{
      await handleSubmit(value);
      navigate("/profile");
    }

    
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex  items-center justify-between mr-8">
          <div className="flex space-x-2 text-gray-400">
            <SecurityUpdateIcon />
            <h1>Update</h1>
          </div>

          <div
            onClick={() => navigate("/password")}
            className="flex space-x-2 cursor-pointer"
          >
            <VisibilityOffIcon />
            <h1 className="font-bold">Password</h1>
          </div>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl overflow-y-scroll h-[35rem] ">
          <form className="flex flex-col mb-6" onSubmit={handleFormSubmit}>
            <div className="flex py-10 ml-10 space-x-28">
              <div className="flex flex-col space-y-10">
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Name :</h1>
                  <input
                    placeholder={user?.fullName}
                    className="border-2 px-2 py-1 text-sm"
                    type="text"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                    style={{ color: 'black' }} 
                  />
                </div>

                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">DOB :</h1>
                  <input
                    placeholder={user?.dob}
                    className="border-2 px-2 py-1 text-sm"
                    type="text"
                    value={value.dob}
                    onChange={(e) =>
                      setValue({ ...value, dob: e.target.value })
                    }
                    style={{ color: 'black' }} 
                  />
                </div>

                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Email :</h1>
                  <input
                    placeholder={user?.email}
                    disabled
                    className="border-2 px-2 py-1 text-sm"
                    type="text"
                    style={{ color: 'black' }} 
                  />
                </div>
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Batch :</h1>
                  <input
                    placeholder={user?.year}
                    className="border-2 px-2 py-1 text-sm"
                    value={value.year}
                    onChange={(e) =>
                      setValue({ ...value, year: e.target.value })
                    }
                    type="text"
                    style={{ color: 'black' }} 
                  />
                </div>
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Father's Name :</h1>
                  <input
                    placeholder={user?.fatherName}
                    className="border-2 px-2 py-1 text-sm"
                    value={value.fatherName}
                    onChange={(e) =>
                      setValue({ ...value, fatherName: e.target.value })
                    }
                    type="text"
                    style={{ color: 'black' }} 
                  />
                </div>
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Mother's Name :</h1>
                  <input
                    placeholder={user?.motherName}
                    className="border-2 px-2 py-1 text-sm"
                    value={value.motherName}
                    onChange={(e) =>
                      setValue({ ...value, motherName: e.target.value })
                    }
                    type="text"
                    style={{ color: 'black' }} 
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-10 pr-6">
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Department :</h1>
                  <Select
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.department}
                    onChange={(e) =>
                      setValue({ ...value, department: e.target.value })
                    }>
                    <MenuItem value="">None</MenuItem>
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp}>
                        {dp}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Contact Number :</h1>
                  <input
                    placeholder={user?.contactNumber}
                    className="border-2 px-2 py-1 text-sm"
                    type="text"
                    value={value.contactNumber}
                    onChange={(e) =>
                      setValue({ ...value, contactNumber: e.target.value })
                    }
                    style={{ color: 'black' }} 
                  />
                </div>
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Year :</h1>
                  <input
                    placeholder={user?.year}
                    className="border-2 px-2 py-1 text-sm"
                    type="text"
                    value={value.year}
                    onChange={(e) =>
                      setValue({ ...value, year: e.target.value })
                    }
                    style={{ color: 'black' }} 
                  />
                </div>
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Section :</h1>
                  <input
                    placeholder={user?.section}
                    className="border-2 px-2 py-1 text-sm"
                    type="text"
                    value={value.section}
                    onChange={(e) =>
                      setValue({ ...value, section: e.target.value })
                    }
                    style={{ color: 'black' }} 
                  />
                </div>
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">
                    Father's Contact Number :
                  </h1>
                  <input
                    placeholder={user?.fatherContactNumber}
                    className="border-2 px-2 py-1 text-sm"
                    value={value.fatherContactNumber}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        fatherContactNumber: e.target.value,
                      })
                    }
                    type="text"
                    style={{ color: 'black' }} 
                  />
                </div>
                <div className="grid grid-cols-2  gap-10">
                  <h1 className="font-bold text-lg bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">Avatar :</h1>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setValue({ ...value, avatar: base64 })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="self-center space-x-6">
              <button className="bg-red-500 w-24 h-8 rounded-md text-white hover:scale-105 hover:bg-red-700 transition-all duration-200 " type="submit">
                Submit
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-500 w-24 h-8 rounded-md text-white hover:scale-105 hover:bg-blue-700 transition-all duration-200"
                type="button"
              >
                Cancel
              </button>
            </div>

            <div className="flex justify-center mt-6">
              {isLoading && (
                <Spinner
                  message="Updating"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error && <p>Error: {error}</p>} {/* Display error message */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBody;
