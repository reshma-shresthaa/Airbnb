import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { createContext, useState, useContext, useEffect } from 'react'
import { authDataContext } from './authContext'

export const listingDataContext = createContext()

function ListingContext({ children }) {
  let navigate = useNavigate()
  let [title, setTitle] = useState("")
  let [description, setDescription] = useState("")
  let [frontEndImage1, setFrontEndImage1] = useState(null)
  let [frontEndImage2, setFrontEndImage2] = useState(null)
  let [frontEndImage3, setFrontEndImage3] = useState(null)
  let [backEndImage1, setBackEndImage1] = useState(null)
  let [backEndImage2, setBackEndImage2] = useState(null)
  let [backEndImage3, setBackEndImage3] = useState(null)
  let [rent, setRent] = useState("")
  let [city, setCity] = useState("")
  let [landmark, setLandmark] = useState("")
  let [category, setCategory] = useState("")
  let [adding, setAdding] = useState(false)
  let [listingData, setListingData] = useState([])
  let [newlistData, setNewListData] = useState([])
  
  let { serverUrl } = useContext(authDataContext)

 const handleAddListing = async () => {
  setAdding(true)
  try {
    let formData = new FormData()
    formData.append("title", title)
    formData.append("image1", backEndImage1)
    formData.append("image2", backEndImage2)
    formData.append("image3", backEndImage3)
    formData.append("description", description)
    formData.append("rent", Number(rent)) // Convert to number
    formData.append("city", city)
    formData.append("landMark", landmark)
    formData.append("category", category)

    // Add headers for FormData
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }

    console.log("Sending form data:")
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    const result = await axios.post(serverUrl + "/api/listing/add", formData, config)
    
    setAdding(false)
    console.log("Success:", result)
    navigate("/")
    
    // Reset all states
    setTitle("")
    setDescription("")
    setFrontEndImage1(null)
    setFrontEndImage2(null)
    setFrontEndImage3(null)
    setBackEndImage1(null)
    setBackEndImage2(null)
    setBackEndImage3(null)
    setRent("")
    setCity("")
    setLandmark("")
    setCategory("")

  } catch (error) {
    setAdding(false)
    console.log("Error details:", error)
    console.log("Error response:", error.response?.data)
  }
}

  const handleViewCard = async (id)=> {
    
    try {
      let result = await axios.get( serverUrl + `/api/listing/findlistingbyid/${id}`,{withCredentials:true})

      console.log(result)
      navigate("/viewcard")
    } catch (error) {
      console.log(error)
    }
  }

  const getListing = async () => {
    try {
      let result = await axios.get( serverUrl + "/api/listing/get",{withCredentials:true})
      
      setListingData(result.data)
      setNewListData(result.data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getListing()
  },[adding])

  let value = {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
    handleAddListing,
    setAdding,adding,
    listingData,setListingData,
    newlistData,setNewListData,
    getListing,
    handleViewCard

  }
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  )
}

export default ListingContext