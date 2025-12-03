import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'

import { userDataContext } from './Context/userContext'


function App() {
    const userContext = useContext(userDataContext)
    
  
  // ✅ SAFE CHECK: Handle undefined context
  if (!userContext) {
    return <div>Loading...</div>
  }

  const { userData,loading } = userContext

    if (loading) {
        return <div>Loading user data...</div>
    }

  // let {userData} = useContext(userDataContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/listingpage1' element={userData != null ?<ListingPage1/>:<Navigate to= {"/"}/>}/>
        <Route path='/listingpage2' element={userData != null ?<ListingPage2/>:<Navigate to= {"/"}/>}/>
        <Route path='/listingpage3' element={userData != null ?<ListingPage3/>:<Navigate to= {"/"}/>}/>
        <Route path='/mylisting' element={userData != null ?<MyListing/>:<Navigate to= {"/"}/>}/>
        <Route path='/viewcard' element={userData != null ?<ViewCard/>:<Navigate to= {"/"}/>}/>
      </Routes>
    </>
  )
}

export default App