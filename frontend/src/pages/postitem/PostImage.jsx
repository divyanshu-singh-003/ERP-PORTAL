/* eslint-disable react/jsx-key */
import React from 'react'
import { useState,useEffect } from 'react';
import UploadProduct from '../../components/item/UploadProduct'
import { useAuthContext } from '../../context/AuthContext';
import UserCard from '../../components/item/UserCard';

const PostImage = () => {
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


  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
      <h2 className='font-bold text-lg text-black'>Lost Items</h2>
      <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Item</button>
      
      </div>
      
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(60vh-160px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <UserCard data={product} key={index+"All items"} fetchData={fetchAllProduct}/>
                
              )
            })
          }
        </div>


      {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} />
          )
        }
    </div>
  )
}

export default PostImage