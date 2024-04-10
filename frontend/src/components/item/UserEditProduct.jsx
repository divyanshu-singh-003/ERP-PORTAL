/* eslint-disable react/prop-types */
import React from 'react'
import {useState,useEffect} from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuthContext } from '../../context/AuthContext';
import { IoCloudUpload } from "react-icons/io5";

import uploadImage from '../../../utils/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";


const UserEditProduct = ({
    onClose,itemdata,fetchData
}) => {
    const {authUser} = useAuthContext();

    const types=["Lost it","Found it"];
    const [data,setData] =useState({
        ...itemdata,
        name:itemdata?.name,
        description:itemdata?.description,
        question:itemdata?.question || [],
        type:itemdata?.type,
        image:itemdata?.image,
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


    const handleUploadProduct = async(e) =>{
        const file = e.target.files[0];
        console.log("file",file);

        const uploadImageCloudinary = await uploadImage(file);


        setData((preve)=>{
            return{
              ...preve,
              image : [ ...preve.image, uploadImageCloudinary.url]
            }
          })
        console.log("upload image",uploadImageCloudinary.url);
    }

    const handleDeleteItemImage = async(index)=>{
        console.log("image index",index);
        
      }

      const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("data",data);

        const response = await fetch("/api/lfitem/updatelfitem",{
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
            fetchData();
        }


        if(responseData.error){
            toast.error(responseData?.message);
        }
      }
  return (
    <div className="fixed w-full h-full bg-op-35 top-0 right-0 bottom-0 flex justify-center items-center text-black">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
            <h2 className="font-bold text-lg">Edit Product</h2>
            <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                <IoCloseOutline/>
            </div>
            </div>
            <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
            <label htmlFor="name">Item Name</label>
            <input 
              type='text' 
              id='name' 
              placeholder='enter product name' 
              name='name'
              value={data.name} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />
            <label htmlFor="description">Description</label>
            <input 
              type='text' 
              id='description' 
              placeholder='Give brief description' 
              name='description'
              value={data.description} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />
            <label htmlFor="question">Question</label>
            <input 
              type='text' 
              id='question' 
              placeholder='Ask a question about your item?' 
              name='question'
              value={data.question} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />
            <label htmlFor="type" className="mt-3">Type</label>
            <select value={data.type} name="type" onChange={handleOnChange} className="p-2 bg-slate-100 border rounded">
            <option value={""}>Select Category</option>
                {
                    types.map((el,index)=>{
                        return <option value={el} key={index+1}>{el}</option>
                    })
                }
            </select>
            <label htmlFor="image" className="mt-3">Item image</label>
            <label htmlFor="uploadImageInput">
            <div className="p-2 border bg-slate-100 rounded h-28 w-full flex justify-center items-center cursor-pointer">
                
               <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl"><IoCloudUpload/></span>
                <p className="text-sm">Upload Product Image</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct}></input>
                </div>
               
            </div>
            </label>
            <div>
                {
                    data?.image[0] ? (
                        <div className="flex items-center gap-2">
                        {
                        data.image.map((el,index)=>{
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <div className="relative group">
                                    <img src={el} alt="el" width={80} height={80} className="bg-slate-100 border"></img>
                                    <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer" onClick={handleDeleteItemImage(index)}>
                                        <MdDelete/>
                                    </div>
                                </div>
                            )
                        })
                       }      
                        </div>
                        
                    ):(
                        <p className="text-red-600 text-xs">*Please Upload Image</p>
                    )
                }
                
            </div>
            <button className="px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700">Update Item</button>
            </form>
        </div>
        {/***display image full screen */}
        
        </div>
  )
}

export default UserEditProduct