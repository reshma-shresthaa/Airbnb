import React, { useContext } from 'react'
import Nav from '../Component/Nav'
import Card from '../Component/card';

import { listingDataContext } from '../Context/listingContext';

function Home() {
  let {listingData,setListingData}=useContext(listingDataContext)
  let {newListData,setNewListData}=useContext(listingDataContext)
  
  return (
    <div >
        <Nav />
        <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px] '>
        {newListData.map((list)=>(
          <Card key={list.id} title={list.title} landmark={list.landMark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list.id}/>
        ))}

        </div>
    </div>
  )
}

export default Home
    