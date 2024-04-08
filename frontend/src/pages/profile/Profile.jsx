import React from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import { Avatar } from "@mui/material";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import useGetSingleStudent from "../../hooks/getStudentDetails";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading } = useGetSingleStudent(); // Use the custom hook to fetch user details

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (!user) {
    return <div>User not found.</div>; // Display message if user data is not found
  }

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex items-center justify-between mr-8">
          <div className="flex space-x-2 text-gray-400">
            <AssignmentIndIcon />
            <h1>Profile</h1>
          </div>
          <div
            onClick={() => navigate("/updatestu")}
            className="flex space-x-2 cursor-pointer"
          >
            <SecurityUpdateIcon />
            <h1 className="font-bold">Update</h1>
          </div>
        </div>
        <div className="w-[98%] bg-white relative rounded-xl ">
          <div className="absolute left-[50%] top-[-10%] ">
            <Avatar
              src={user.avatar}
              sx={{ width: 70, height: 70 }}
            />
          </div>
          <div className="overflow-y-scroll h-[32rem]">
            <div className="flex py-10 ml-10 space-x-40">
              <div className="flex flex-col space-y-10">
                <Data label="Name" value={user.fullName} />
                <Data label="Email" value={user.email} />
                <Data label="Gender" value={user.gender} />
                <Data label="Department" value={user.department} />
                <Data label="Father's Name" value={user.fatherName} />
                <Data label="Mother's Name" value={user.motherName} />
              </div>
              <div className="flex flex-col space-y-10">
                <Data label="DOB" value={user.dob} />
                <Data label="Year" value={user.year} />
                <Data label="Contact Number" value={user.contactNumber} />
                <Data label="Section" value={user.section} />
                <Data
                  label="Father's Contact Number"
                  value={user.fatherContactNumber}
                />
                <Data label="Batch" value={user.year} />
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Profile;
