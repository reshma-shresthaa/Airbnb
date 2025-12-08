import React, { useContext, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/listingContext';
import { userDataContext } from '../Context/userContext';
import axios from 'axios';
import { authDataContext } from '../Context/authContext';

function ViewCard() {
  let navigate = useNavigate()
  let { cardDetails } = useContext(listingDataContext)
  let { userData } = useContext(userDataContext)
  let [updatePopUp, setUpdatePopUp] = useState(false)

  let [title, setTitle] = useState(cardDetails.title)
  let [description, setDescription] = useState(cardDetails.description)
  let [backEndImage1, setBackEndImage1] = useState(null)
  let [backEndImage2, setBackEndImage2] = useState(null)
  let [backEndImage3, setBackEndImage3] = useState(null)
  let [rent, setRent] = useState(cardDetails.rent)
  let [city, setCity] = useState(cardDetails.city)
  let [landmark, setLandmark] = useState(cardDetails.landMark)
  let {serverUrl}= useContext(authDataContext)
  let {updating, setUpdating} = useContext(listingDataContext )
  let {deleting, setDeleting} = useContext(listingDataContext )



  const handleUpdateListing = async () => {
    setUpdating(true)
    try {
    let formData = new FormData()
    formData.append("title", title)
    if(backEndImage1){formData.append("image1", backEndImage1)}
    if(backEndImage2){formData.append("image2", backEndImage2)}
    if(backEndImage3){formData.append("image3", backEndImage3)}
    formData.append("description", description)
    formData.append("rent", Number(rent)) // Convert to number
    formData.append("city", city)
    formData.append("landMark", landmark)

    let result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true, headers: {
          'Content-Type': 'multipart/form-data'
        }})
    console.log(result)
    navigate("/")
    setTitle("")
    setDescription("")
    setBackEndImage1(null)
    setBackEndImage2(null)
    setBackEndImage3(null)
    setRent("")
    setCity("")
    setLandmark("")
    

  } catch (error) {
    console.log(error)
    setUpdating(false)
  }
}

const handleDeleteListing = async () => {
  setDeleting(true)
  try {
    let result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`,  { withCredentials: true} )
    console.log(result.data)
    navigate("/")
    setDeleting(false)
  } catch (error) {
      console.log(error)
      setDeleting(false)
  }
}

const handleImage1 = (e) => {
  let file = e.target.files[0]
  setBackEndImage1(file)

}
const handleImage2 = (e) => {
  let file = e.target.files[0]
  setBackEndImage2(file)

}

const handleImage3 = (e) => {
  let file = e.target.files[0]
  setBackEndImage3(file)

}

return (
  <div className='w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative'>

    <div className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate("/")}>
      <FaArrowLeft className='w-[25px] h-[25px] text-[white] ' /></div>

    <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
      <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]'>
        {`In ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
      </h1>
    </div>

    <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row '>
      <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white'>
        <img src={cardDetails.image1} alt="" className='w-[100%]' />
      </div>
      <div className='w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col '>
        <div className='w-[100%] h-[50%] overflow-hidden flex items-center justify-center border-[2px]'>
          <img src={cardDetails.image2} alt="" className='w-[100%]' />
        </div>
        <div className='w-[100%] h-[50%] overflow-hidden flex items-center justify-center border-[2px]'>
          <img src={cardDetails.image3} alt="" className='w-[100%]' />
        </div>
      </div>

    </div>
    <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()}, ${cardDetails.landMark.toUpperCase()}`}</div>
    <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800'>{cardDetails.description}</div>
    <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`Rs.${cardDetails.rent}/day `}</div>

    <div className='w-[95%] h-[50px] flex items-center justify-start px-[110px]'>
      {cardDetails.host == userData._id && <button className='px-[30px] py-[10px] bg-[#f14242] rounded-lg text-[white] text-[18px] md-px-[100px]  text-nowrap' onClick={() => setUpdatePopUp(prev => !prev)}>
        Edit listing
      </button>}
      {cardDetails.host != userData._id && <button className='px-[30px] py-[10px] bg-[#f14242] rounded-lg text-[white] text-[18px] md-px-[100px] text-nowrap '  >
        Reserve Now
      </button>}
    </div>

    {/* Update Listing Page    */}
    {updatePopUp && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#000000c6] absolute top-[0px] z-[100] backdrop-blur-sm'>

      <RxCross2 className='w-[30px] h-[30px] bg-[#f14242] cursor-pointer absolute top-[6%] left-[25px] rounded-[50%] flex items-center justify-center ' onClick={() => setUpdatePopUp(false)} />

      <form action="" className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col  gap-[10px] overflow-auto mt-[50px] text-white bg-[#272727] p-[20px] rounded-lg' onSubmit={(e)=>{e.preventDefault()}} >

        <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'>
          Update Your details
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="title" className='text-[20px]'>Title</label>
          <input type="text" id='title' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]' required placeholder='_bhk house or best title' onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="des" className='text-[20px]'>Description</label>
          <textarea name="" id="desc" className='w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]' required onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="img1" className='text-[20px]'>Image1</label>
          <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
            <input type="file" id='img1' className='w-[100%]  text-[15px] px-[10px] text-[black]' required onChange={handleImage1} />
          </div>
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="img2" className='text-[20px]'>Image2</label>
          <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px] text-[black]'>
            <input type="file" id='img2' className='w-[100%]  text-[15px] px-[10px]' required onChange={handleImage2} />
          </div>
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="img3" className='text-[20px]'>Image3</label>
          <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px] text-[black]'>
            <input type="file" id='img3' className='w-[100%]  text-[15px] px-[10px]' required onChange={handleImage3} />
          </div>
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="rent" className='text-[20px]'>Rent</label>
          <input type="number" id='rent' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]' required placeholder='Rs._____/day' onChange={(e) => setRent(e.target.value)} value={rent} />
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="city" className='text-[20px]'>City</label>
          <input type="text" id='city' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]' required onChange={(e) => setCity(e.target.value)} value={city} />
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
          <input type="text" id='landmark' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]' required onChange={(e) => setLandmark(e.target.value)} value={landmark} />
        </div>

        <div className='w-[100%] flex items-center justify-center gap-[30px] mt-[20px]'>
          <button className='px-[10px] py-[10px] bg-[#f14242] rounded-2xl text-[white] text-[15px] md-px-[100px] md:text-[18px] text-nowrap' onClick={handleUpdateListing} disabled={updating}>{updating ? "updating..." : "Update Listing"}</button>

          <button className='px-[10px] py-[10px] bg-[#f14242] rounded-2xl text-[white] text-[15px] md-px-[100px] md:text-[18px] text-nowrap' onClick={handleDeleteListing} disabled={deleting}>{deleting?"Deleting....":"Delete listing"}</button>
        </div>

        



      </form>
    </div>}


  </div>
)
}

export default ViewCard