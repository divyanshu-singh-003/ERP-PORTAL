/* eslint-disable react/prop-types */
import React from 'react'
import {useState,useEffect} from 'react'
import { MdModeEditOutline } from "react-icons/md";
import UserEditProduct from './UserEditProduct';
import { MdDelete } from "react-icons/md";

import { Link } from 'react-router-dom';


const UserCard = ({
    data,
    fetchData,
    deleteProduct
}) => {

    const [editProduct,setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded h-56 w-56">
            <div className="w-48  h-40">
            <div className='w-32 h-32 flex justify-center items-center'>
              <Link to={"/useritem/"+data._id}>
              <img src={data.image[0]} width={100} height={120} className="w-fit mx-auto"/>
              </Link>

                </div>
                <h1 className="text-black text-lg text-ellipsis line-clamp-2">{data.name}</h1>
                <h3 className={`text-ellipsis line-clamp-2 text-sm ${data.foundBy === 'None' ? 'text-red-500' : 'text-green-500'}`}>
                  Status: {data.foundBy} {data.emailBy !== 'None' && `(${data.emailBy})`}
                </h3>
                <div className="flex justify-between">
                <div className=' text-black w-fit ml-0 p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer ' onClick={()=>deleteProduct(data._id)}>                    <MdDelete/>
                </div>
                <div className=' text-black w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>                    <MdModeEditOutline/>
                </div>
                </div>
                </div>
                {
          editProduct && (
            <UserEditProduct itemdata={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
          )
        }
    </div>
  )
}

export default UserCard