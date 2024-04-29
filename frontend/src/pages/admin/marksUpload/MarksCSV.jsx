import React , {useState , useEffect} from 'react'
import BoyIcon from "@mui/icons-material/Boy";

import { MenuItem, Select } from "@mui/material";

import toast from "react-hot-toast"
import Papa from 'papaparse';

import { IoCloudUpload } from "react-icons/io5";



const MarksCSV = () => {

  const [value, setValue] = useState({
    test: "", 
    subjectCode:"",       
  }); 

  const [data,setData] =  useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        console.log(results.data); // Move console.log here
      },
    });
  };


  

  const handleUpload2 = async (parsedData) => {
    const validStudents = parsedData.filter(
      student =>
        student.Name.trim() !== "" &&
        student.Email.trim() !== "" &&
        student.Marks.trim() !== ""
    );
  
    if (validStudents.length === 0) {
      console.log("No valid data found for upload.");
      return;
    }
  
    for (const stu of validStudents) {
      const response = await fetch("/api/admin/adminmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName: stu.Name,
          email: stu.Email,
          subjectCode: value.subjectCode,
          test: value.test,
          marks: stu.Marks
        })
      });
      const responseData = await response.json();
      if (responseData.error) {
        toast.error(responseData.message);
      }
    }
    toast.success("Marks Uploaded successfully");
  };
  
  useEffect(() => {
    handleUpload2(data); // Call handleUpload2 whenever data changes
  }, [data]);


  const tests = ["T1" , "T2" ,"EndSem"];

  const [search, setSearch] = useState(false);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(value);
    setSearch(true);

    setValue({
      ...value,
      test: e.target.test.value,
      subjectCode: e.target.subjectCode.value
    });

    toast.success("Enter CSV now");

  }

  useEffect(() => {
    if (search) {
      toast.success("Enter CSV now");
    }
  }, [search]);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="flex text-gray-400 items-center space-x-2">
                <BoyIcon />
                <h1>All Students</h1>
            </div>
            <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
            <form className="flex flex-col space-y-2 col-span-1 text-black"
            onSubmit={handleSubmit}>
            <label htmlFor="test">Test</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.test}
              onChange={(e) => setValue({ ...value, test: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              {tests?.map((test, idx) => (
                <MenuItem value={test} key={idx}>
                  {test}
                </MenuItem>
              ))}
            </Select>

            <label htmlFor='subjectCode'>Sub. Code</label>
            <input
              value={value.subjectCode}
              onChange={(e) => setValue({ ...value, subjectCode: e.target.value })}
              placeholder="Enter Valid subject Code"
              className="border-2 px-2 py-1 text-sm w-56 h-15"
              type="text"
              style={{ color: 'black' }} 
            />   
            <button
              className="bg-red-500 w-24 h-8 rounded-md text-white hover:scale-105 hover:bg-red-700 transition-all duration-200 "
              type="submit">
              Set Test
            </button>        
            </form>
            <div>
            <label htmlFor ="csv" className="text-black">Marks CSV</label>
            <label htmlFor="uploadCSVInput">
            <div className="p-2 border bg-slate-100 rounded h-28 w-full flex justify-center items-center cursor-pointer">
                
               <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl"><IoCloudUpload/></span>
                <p className="text-sm">Upload Marks CSV</p>
                <input type="file" id="uploadCSVInput" accept =".csv" className="hidden" onChange={handleFileUpload}></input>
                </div>
               
            </div>
            </label> 
            </div>          
              </div>
      </div>
  )
}

export default MarksCSV