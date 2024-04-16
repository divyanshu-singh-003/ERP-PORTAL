import React from 'react'
import {useState,useEffect} from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuthContext } from '../../context/AuthContext';
import toast from "react-hot-toast";


const UploadTrip = ({
    onClose,
    fetchCabs
}) => {

    const {authUser} = useAuthContext();

    const [data,setData] =useState({
        stuid:authUser.fullName,
        train:"",
        date:"",
        hour:"",
        minute:"",
        destination:"",
        phoneNumber:"",
        email:authUser.email,
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target;

        setData((preve)=>{
           return{
               ...preve,
               [name]: value
           }
        })
   }

   const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("data" , data);
    const response = await fetch("/api/cabs/putcab",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    })
    const responseData = await response.json();

        if(responseData.success){
            toast.success(responseData?.message)
            onClose();
            fetchCabs(data.date,data.destination);
        }


        if(responseData.error){
            toast.error(responseData?.message);
        }
  }
  return (
    <div className="fixed w-full h-full bg-op-35 top-0 right-0 bottom-0 flex justify-center items-center text-black">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
        <h2 className="font-bold text-lg">Upload Trip</h2>
            <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                <IoCloseOutline/>
            </div>
        </div>

        {/* form */}

        <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"onSubmit={handleSubmit} >
        <label htmlFor="train">Train</label>
        <input 
              type='text' 
              id='train' 
              placeholder='enter train number' 
              name='train'
              value={data.train} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
        />
        <label htmlFor="date">Date</label>
        <input 
              type='text' 
              id='date' 
              placeholder='enter date of arrival dd-mm-yyyy' 
              name='date'
              value={data.date} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
        />

        
        <label htmlFor="hour">Hour</label>
        <input 
              type='text' 
              id='hour' 
              placeholder='enter arrival hour in 24-h format' 
              name='hour'
              value={data.hour} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
        />
        <label htmlFor="minute">Minutes</label>
        <input 
              type='text' 
              id='minute' 
              placeholder='enter arrival minutes (0-59)' 
              name='minute'
              value={data.minute} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
        />
        <label htmlFor="destination">Destination</label>
        <input 
              type='text' 
              id='destination' 
              placeholder='Enter arriving station' 
              name='destination'
              value={data.destination} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input 
              type='text' 
              id='phoneNumber' 
              placeholder='Enter 10 digit phone-number' 
              name='phoneNumber'
              value={data.phoneNumber} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
        />
        <button className="px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700">Upload Trip</button>

        </form>

        </div>
        </div>
  )
}

export default UploadTrip