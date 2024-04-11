/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState , useEffect ,useRef } from 'react'
import { fetchCategoryWiseProduct } from '../../hooks/fetchCategoryWiseProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

import { Link } from 'react-router-dom';


const VerticalCard = ({category , heading}) => {

  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false)

  const [scroll,setScroll] = useState(0)
  const scrollElement = useRef()

  const fetchData = async() =>{
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  }
  const loadingList = new Array(13).fill(null);

  useEffect(() =>{
    fetchData()
  },[])

  const scrollRight = () =>{
    scrollElement.current.scrollLeft += 300
}
const scrollLeft = () =>{
    scrollElement.current.scrollLeft -= 300
}


  return (
    <div className="flex-col  mx-auto px-4 my-6">

      <h2 className="text-2xl font-semibold py-2">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all" ref={scrollElement}>
      <button  className='bg-white shadow-md rounded-full p-1 left-0 text-lg hidden md:block text-black' onClick={scrollLeft}><FaAngleLeft/></button>
      <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block text-black' onClick={scrollRight}><FaAngleRight/></button> 
      {
        data.map((product,index) =>{
          return (
            <Link to = {"/lfitem/" + product?._id} className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow text-black">
             <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
             <img src={product.image[0]} className="object-scale-down h-full hover:scale-110 transition-all"></img>

            </div>
          <div className="p-4 gap-3">
            <h2 className="font-medium text-base text-ellipsis line-clamp-1">Item Name -    {product?.name}</h2>
            <p className="text-slate-500">Status        - {category}</p>
            <p className="text-ellipsis line-clamp-1">{category} By   -    {product?.fullName}</p>
            
        </div>
      </Link>
          )
        })
      }
      </div>

      


    </div>
  )
}

export default VerticalCard