import React from 'react'
import HorizontalCard from '../../components/item/HorizontalCard'
import VerticalCard from '../../components/item/VerticalCard'
const ShowAll = () => {
  return (
    <div>
      <HorizontalCard category={"Lost"} heading ={"Lost Items"}/>
      <VerticalCard category={"Found"} heading ={"Found Items"}/>
    </div>
  )
}

export default ShowAll