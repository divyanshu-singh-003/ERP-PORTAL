/* eslint-disable react/jsx-key */
import React from 'react'

import {useState , useEffect} from "react"

import toast from "react-hot-toast"

import {useParams} from "react-router-dom"

import { useAuthContext } from '../../context/AuthContext';

const UserCardDetails = () => {

  const { authUser } = useAuthContext();
  const [data,setData] = useState({
    fullName:"",
        name:"",
        description:"",
        question:"",
        type:"",
        image:[],
        email:"",
        foundBy:"",
        emailBy:"",
        answer:"",
  })

  const [loading,setLoading] = useState(true)

  const params = useParams();
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  console.log("product id" , params.id);



  const fetchProductDetails = async() =>{

    setLoading(true);
    const response = await fetch(`/api/lfitem/getitem?productId=${params.id}`,{
      method:"get",
      headers:{
        "content-type": "appication/json"
      },
    })
    const dataResponse = await response.json();

    console.log(dataResponse.data);
    
    setData(dataResponse.data);

    setActiveImage(dataResponse?.data?.image[0])

    setLoading(false);

  }
  

  useEffect(() =>{
    fetchProductDetails();
  },[])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }



  return (
    <div className="container mx-auto p-4 bg-white text-black">

      <div className= "min-h-[200px] flex flex-col lg:flex-row gap-8">

        <div className="h-96 flex flex-col  lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 ">
            <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply"></img>
          </div>
          <div className="h-full">
            {
              loading ? (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {

                
                productImageListLoading.map((el =>{
                  return(
                    <div className="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>
                  )
                }))
              }
              </div>
                
              ):
              (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {

                
                data.image.map((imgURL) =>{
                  return(
                    <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imgURL}>
                      <img src={imgURL} className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer" onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}></img>
                    </div>
                  )
                })
              }
              </div>
              )
            }
          </div>

        </div>

        <div className="flex flex-col gap-1 ">
          <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">{data.type}</p>
          <h2 className="text-3xl lg:text-4xl font-medium">{data?.name}</h2>

          <div>
            <p className="text-slate-600 font-medium my-1">Description:</p>
            <p>{data?.description}</p>
          </div>
          <div>
            <p className="text-slate-600 font-medium my-1">Question:</p>
            <p>{data?.question}</p>
          </div>
          <div>
          <h1 className={`text-ellipsis line-clamp-2  ${data.foundBy === 'None' ? 'text-red-500' : 'text-green-500'}`}>
                  Status: {data.foundBy} {data.emailBy !== 'None' && `(${data.emailBy})`}
           </h1>
          </div>
          <div>
          {data.answer === "" ? (
            <h1 className="text-red-500">Answer: None</h1>
          ) : 
          (
          <h1 className="text-green-500">Answer: {data.answer}</h1>
          )}
          </div>
          

          
    
        </div>
      </div>
    </div>
  )
}

export default UserCardDetails