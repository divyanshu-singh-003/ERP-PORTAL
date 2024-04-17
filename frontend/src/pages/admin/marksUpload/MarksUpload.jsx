import React , {useState , useEffect} from 'react'
import BoyIcon from "@mui/icons-material/Boy";

import Spinner from '../../../../utils/Spinner';
import { MenuItem, Select } from "@mui/material";

import toast from "react-hot-toast"




const MarksUpload = () => {

    const [marks, setMarks] = useState([]);

    const [value, setValue] = useState({
        department: "",
        year: "",
        section: "",
        test: "", 
        subjectCode:"",       
      });
      const [search, setSearch] = useState(false);

      const [students,setStudents] = useState([]);

      const tests = ["T1" , "T2" ,"EndSem"];

      const handleSubmit = (e) =>{
        e.preventDefault();
        setSearch(true);
        fetchStudents(value.year,value.section,value.department);
        console.log(value);
        
      }
      const fetchStudents=async(year , section , department)=>{

        const response = await fetch(`/api/admin/adminstudents?year=${year}&department=${department}&section=${section}`,{
            method:"get",
        });
        const responseData = await response.json();

        if(responseData.success){
          const studentsWithMarks = responseData.data.map(student => ({
            ...student,
            marks: '' // Add an empty string initially for the marks
          }));
          setStudents(studentsWithMarks);
            console.log(students);
        }
        if(responseData.error){
            toast.error(responseData.message);
        }
      }
      const handleMarksChange = (e, index) => {
        const { value } = e.target;
        setStudents(prevStudents => {
          const updatedStudents = [...prevStudents];
          updatedStudents[index].marks = value;
          return updatedStudents;
        });
      };

      const handleUpload = async () =>{
        const validStudents = students.filter(student => student.marks !== '');
        for(const stu of validStudents){
          const response = await fetch("/api/admin/adminmarks",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              fullName:stu.fullName,
              email:stu.email,
              subjectCode:value.subjectCode,
              test:value.test,
              marks:stu.marks
            })
          })
          const responseData = await response.json();
          if(responseData.error){
            toast.error(responseData.message);
          }
        }
        toast.success("Marks Uploaded successfully");
      }
      
  return (
    <div className="flex-[0.8] mt-3">
        <div className="space-y-5">
            <div className="flex text-gray-400 items-center space-x-2">
                <BoyIcon />
                <h1>All Students</h1>
            </div>
            <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
                <form className="flex flex-col space-y-2 col-span-1 text-black"
                onSubmit={handleSubmit}>
                <label htmlFor="year">Year</label>

                <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.year}
              onChange={(e) => setValue({ ...value, year: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
              <MenuItem value="2027">2027</MenuItem>
            </Select>
            <label htmlFor="section">Section</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.section}
              onChange={(e) => setValue({ ...value, section: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
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
            <label htmlFor="department">Department</label>

                <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.department}
              onChange={(e) => setValue({ ...value, department: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
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
              Search
            </button>
                </form>
            <div className="col-span-3 mr-6">
            {
              search && students?.length!==0 && (
                <div className= "flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-black h-[20rem]  shadow-lg pl-5 rounded-md overflow-x-hidden text-black">
                  <div className="grid grid-cols-8">
                    <h1 className="col-span-1 font-bold py-2 px-2">
                      Sr no.
                    </h1>
                    <h1 className="col-span-2 font-bold py-2 px-2">
                      Name
                    </h1>
                    <h1 className="col-span-2 font-bold py-2 px-2">
                      Email
                    </h1>
                    <h1 className="col-span-1 font-bold py-2 px-2">
                      Section
                    </h1>
                    <h1 className="col-span-2 font-bold py-2 px-2">
                      Marks
                    </h1>
                  </div>
                  {students?.map((stu, idx) => (
                    <div
                      key={idx}
                      className="grid hover:scale-105 transition-all duration-150 grid-cols-8">
                      <h1
                        className="col-span-1 py-2 px-2">
                        {idx + 1}
                      </h1>
                      <h1
                        className="col-span-2 py-2 px-2">
                        {stu.fullName}
                      </h1>
                      <h1
                        className="col-span-2 py-2 px-2">
                        {stu.email}
                      </h1>

                      <h1
                        className="col-span-1 py-2 px-2">
                        {stu.section}
                      </h1>
                      <input
                        onChange={(e) => handleMarksChange(e, idx)}
                        value={stu.marks}
                        className="col-span-2 border-2 w-24 px-2 h-8"
                        type="text"
                      />
                    </div>
                  ))}

                </div>
              
              )
            }
            {search  && (
              <div className="">
                <button
                  className="w-24 h-8 rounded-md text-white hover:scale-105 hover:bg-red-700 transition-all duration-200 bg-blue-500 mt-5 ml-[22rem]" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            )}
            </div>
            </div>
        </div>

    </div>
  )
}

export default MarksUpload