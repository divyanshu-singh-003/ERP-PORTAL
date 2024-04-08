import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from 'C:/Users/divya/OneDrive/Desktop/ERP/frontend/utils/Spinner.jsx';
import { useNavigate } from "react-router-dom";
import updatePassword from "../../../hooks/updatePassword";
import { useAuthContext } from "../../../context/AuthContext";

const Body = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const { handleSubmit } = updatePassword(); 

  const update = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        await handleSubmit({
          newPassword: newPassword,
          email: authUser.email,
        });
        navigate("/profile");
        alert("Password has been successfully updated !");
      } catch (error) {
        console.error('Error updating password:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <VisibilityOffIcon />
          <h1>Password</h1>
        </div>
        <div className="flex justify-center items-center">
        <div className="mr-10 bg-white flex flex-col rounded-xl w-full lg:w-1/2">
          <form onSubmit={update} className="flex flex-col space-y-6 items-center my-8 ">
            <h1 className="text-black text-3xl font-bold">Update Password</h1>
            <div className="space-y-1">
              <p className="text-[#515966] font-bold text-sm">New Password</p>
              <div className="border-2 rounded-lg px-3 flex items-center space-x-3 w-full">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                  type={showPassword ? "text" : "password"}
                  className="rounded-lg outline-none py-2 placeholder:text-sm"
                  placeholder="New Password"
                  style={{ color: "black" }} // Set text color to black
                />
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[#515966] font-bold text-sm">Confirm Password</p>
              <div className="border-2 rounded-lg px-3 flex items-center space-x-3 w-full">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  type={showPassword ? "text" : "password"}
                  className="rounded-lg outline-none py-2 placeholder:text-sm"
                  placeholder="Confirm Password"
                  style={{ color: "black" }} // Set text color to black
                />
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="self-center space-x-6">
              <button className="bg-red-500 w-24 h-8 rounded-md text-white hover:scale-105 hover:bg-red-700 transition-all duration-200 " type="submit">
                Update
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-500 w-24 h-8 rounded-md text-white hover:scale-105 hover:bg-blue-700 transition-all duration-200"
                type="button">
                Cancel
              </button>
            </div>
            {loading && (
              <Spinner
                message="Updating"
                height={30}
                width={150}
                color="#111111"
                messageColor="#blue"
              />
            )}
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
