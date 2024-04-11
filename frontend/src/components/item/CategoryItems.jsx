import React from 'react'
import {useParams} from "react-router-dom"
const CategoryItems = () => {
    const params = useParams();
    console.log("category" , params.type);
  return (
    <div className="hidden lg:grid grid-cols-[200px,1fr]">

    </div>
  )
}

export default CategoryItems