import React, { useState } from 'react'
import { LiaStarSolid } from "react-icons/lia";

function Star({starValue = 5, onRate}) {
    let [rating,setRating]=useState(0)
    let [hover,setHover]=useState(0)
  return (
    <div className='flex gap-1'>
        {
            [...Array(starValue)].map((_,index)=>
            {
                const starValue = index + 1;
                const isfilled = starValue <= 
                (hover || rating);

                return (
                   <span key={starValue} 
                   onClick={()=>{
                    setRating(starValue)
                    onRate && onRate(starValue)
                   }}
                   onMouseEnter={()=>setHover(starValue)}

                  onMouseLeave={()=>setHover(0)}
                   > 
                    <LiaStarSolid className={`cursor-pointer text-2xl ${isfilled ? 'text-yellow-400' : 'text-gray-300'}`}/>
                   </span>
                )
            }
        )
            }
        

    </div>
  )
}

export default Star