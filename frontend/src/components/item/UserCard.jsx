/* eslint-disable react/prop-types */
import React from 'react'
import {useState,useEffect} from 'react'
import { MdModeEditOutline } from "react-icons/md";
import UserEditProduct from './UserEditProduct';

const UserCard = ({
    data,
    fetchData
}) => {

    const [editProduct,setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded h-56 w-56">
            <div className="w-48  h-40">
            <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data.image[0]} width={100} height={120} className="w-fit mx-auto"/>
                </div>
                <h1 className="text-black text-lg text-ellipsis line-clamp-2">{data.name}</h1>
                <h3 className={`text-ellipsis line-clamp-2 text-sm ${data.foundBy === 'None' ? 'text-red-500' : 'text-green-500'}`}>
                  Status: {data.foundBy} {data.emailBy !== 'None' && `(${data.emailBy})`}
                </h3>

                <div className=' text-black w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>                    <MdModeEditOutline/>
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