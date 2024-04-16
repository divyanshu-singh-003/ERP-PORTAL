/* eslint-disable react/jsx-key */
import React from 'react'
import { useState,useEffect } from 'react';
import UploadProduct from '../../components/item/UploadProduct'
import { useAuthContext } from '../../context/AuthContext';
import UserCard from '../../components/item/UserCard';
import toast from "react-hot-toast"

import { useNavigate } from "react-router-dom";


const PostImage = () => {
  const navigate = useNavigate();

  const {authUser} = useAuthContext();
  const [openUploadProduct,setOpenUploadProduct] = useState(false);

  const [allProduct,setAllProduct] = useState([]);


  const fetchAllProduct = async() =>{
    const response= await fetch(`/api/lfitem/getlfitem?email=${authUser.email}`,{
      method:"get",
    });

    const dataResponse=await response.json();

    setAllProduct(dataResponse?.data || []);

  }

  const deleteProduct = async(productId) =>{


    
      const res = await fetch(`/api/lfitem/getlfitem?productId=${productId}`,{
        method:"delete",
      });

      console.log(res);
      toast.success("Item deleted successfully");
      fetchAllProduct();
    
  }

  const onClickLost = () =>{
    navigate("/item/Lost");
  }

  const onClickFound = () =>{
    navigate("/item/Found");
  }



  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className="bg-white py-3 px-4 flex justify-between items-center">
      <h2 className='font-bold text-lg text-black'>Lost Items</h2>
      <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Item</button>
      
      </div>
      
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-180px)] overflow-y-scroll'>
          {
            
            allProduct.map((product,index)=>{
              return(
                <UserCard data={product} key={index+"All items"} fetchData={fetchAllProduct} deleteProduct={deleteProduct}/>
                
              )
            })
          }
        </div>


      {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} />
          )
        }
      <div className="flex justify-center items-center">
      <div className="py-3 px-4 flex gap-4">
      <button  className='border-2 border-white-600 text-white-600 hover:bg-red-600 hover:text-red transition-all py-1 px-3 rounded-full w-48' onClick={onClickLost}>Lost Item</button>
      <button  className='border-2 border-white-600 text-white-600 hover:bg-red-600 hover:text-red transition-all py-1 px-3 rounded-full w-48' onClick={onClickFound}>Found Item</button>
      </div>
      </div>
    </div>
  )
}

export default PostImage