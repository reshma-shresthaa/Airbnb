import React, { useContext, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../Context/authContext';
import { userDataContext } from '../Context/userContext';

function Login() {
  let [show, setShow] = useState("")
  let {serverUrl} = useContext(authDataContext)
  let {userData,setUserData} = useContext(userDataContext)
  let [email,setEmail]= useState("")
  let [password,setPassword]= useState("")
  // const [showPassword, setShowPassword] = useState(false);

  let {loading,setLoading}= useContext(authDataContext)
  let navigate = useNavigate()
    const handleLogin = async (e) => {
      e.preventDefault()
      setLoading(true)

    try{
      let result = await axios.post(serverUrl + "/api/auth/login",{

        email,
        password
      },{withCredentials:true})
      setLoading(false)
      setUserData(result.data)
      localStorage.setItem("userData", JSON.stringify(result.data))
      navigate("/")
      console.log(result)
    } catch (error) {
      setLoading(false)
        console.log(error)
    }
  }
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>

      <div className='w-[50px] h-[50px] bg-[#84b284] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate("/")}>
        <FaArrowLeft className='w-[25px] h-[25px] text-[white] ' />
      </div>
      <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={handleLogin} >
        <h1 className='text-[30px] text-[black]'>Welcome to Airbnb</h1>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
          <label htmlFor="email" className='text-[20px]'>Email</label>
          <input type="text" id='email' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>

        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] relative'>
          <label htmlFor="password" className='text-[20px]'>Password</label>
          <input type={show ? "text" : "password"} id='password' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setPassword(e.target.value)} value={password} />


          
          {show && <IoEyeOffOutline className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={() => setShow(prev => !prev)} />}
        </div>

        <button className='px-[50px] py-[10px] bg-[#f14242]  text-[white] text-[18px] md-px-[100px] rounded-lg' disabled={loading}>{loading?"Loading....":"Login"}</button>

        <p className='text-[18px]'>Don't have any Account?<span className='text-[19px] text-[red] cursor-pointer' onClick={() => navigate("/SignUp")}>SignUp</span>
        </p>

      </form>
    </div>
  )
}

export default Login
