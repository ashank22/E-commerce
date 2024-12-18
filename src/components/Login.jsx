import React,{useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const initialState={
    username:"",
    password:"",
  
}
const Login = () => {
    const [userData,setUserData]=useState(initialState);
   
    
    const handleChange = (e) => {

        setUserData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
              };
          });
         
    };
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const body=userData;
        setUserData(initialState);
        console.log(userData);
        try{
            const res=await axios.post('http://localhost:5000/user/login',body,{withCredentials:true});
            console.log(res)
            localStorage.setItem('firstLogin',true);
            window.location.href='/'

        }catch(error){
            console.log('error logging');   
        }
        
    }



  return (
    <div className='flex justify-center items-center grow bg-black text-white '>
    <div className='w-1/5 h-auto bg-white  p-4 m-2' >
        <h1 className='text-black text-center '>LOGIN</h1>
        <br />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
            <input className='h-10 text-black focus:outline-none  border-b-black border-b-2' type="text" value={userData.username} placeholder='username' name='username' onChange={handleChange}/>
            <input className='h-10 text-black focus:outline-none  border-b-black border-b-2' type="password" value={userData.password} placeholder='password' name='password' onChange={handleChange}/>
          
            <br/>
            <input type="submit" className='h-9 bg-orange-600   '/>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
