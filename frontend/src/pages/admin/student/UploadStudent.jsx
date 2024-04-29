import React , {useState , useEffect} from 'react'
import BoyIcon from "@mui/icons-material/Boy";

import { MenuItem, Select } from "@mui/material";

import toast from "react-hot-toast"
import Papa from 'papaparse';

import { IoCloudUpload } from "react-icons/io5";



const UploadStudent = () => {

  const [data,setData] =  useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        console.log(results.data);
      },
    });
  };


  

  const handleUpload2 = async (parsedData) => {
    const validStudents = parsedData.filter(student =>
        student.Name.trim() !== "" &&
        student.Email.trim() !== "" &&
        student.Year.trim() !== "" &&
        student.Department.trim() !== "" &&
        student.Section.trim() !== ""
    );

    if (validStudents.length === 0) {
        console.log("No valid data found for upload.");
        return;
    }

    for (const student of validStudents) {
        const {
            Name,
            Email,
            Department,
            Year,
            Section,
            Contact,
            DOB,
            Father,
            FatherContact,
            Mother,
            Gender
        } = student;

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: Name,
                email: Email,
                gender: Gender,
                year: Year,
                department: Department,
                fatherName: Father,
                motherName: Mother,
                contactNumber: Contact,
                dob: DOB,
                section: Section,
                password: "123456",
                confirmPassword:"123456",
                fatherContactNumber:FatherContact,
            })
        });

        const responseData = await response.json();
        if (responseData.error) {
            console.log(responseData.message);
        }
    }

    toast.success("Students Uploaded successfully");
};

useEffect(() => {
    handleUpload2(data); // Call handleUpload2 whenever data changes
}, [data]);




  return (
    <div className="flex-[0.8] mt-3">
      <div className="flex text-gray-400 items-center space-x-2">
                <BoyIcon />
                <h1>All Students</h1>
            </div>
            <div className=" mr-10 bg-white flex-col justify-center items-center rounded-xl pt-6 pl-6 h-[29.5rem]">
            <div className="w-full flex justify-center">
            <label htmlFor ="csv" className="text-black">Upload Student CSV</label>
            </div>
            <div className="w-full flex justify-center mt-10">
            <label htmlFor="uploadCSVInput">
                
            <div className="p-2 border bg-slate-100 rounded h-60 w-[20rem] flex justify-center items-center cursor-pointer">
                
               <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl"><IoCloudUpload/></span>
                <p className="text-sm">Upload Attendance CSV</p>
                <input type="file" id="uploadCSVInput" accept =".csv" className="hidden" onChange={handleFileUpload}></input>
                </div>
               
            </div>
            </label> 
            </div>
                      
              </div>
      </div>
  )
}

export default UploadStudent