import React,{useState} from 'react';
import axios from 'axios';
const initialState={
    username:"",
    password:""
}
const Login = () => {
    const [userData,setUserData]=useState(initialState);
    const handleChange=(e)=>{
   
        setUserData(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const body=userData;
        setUserData(initialState);
        console.log(userData);
        try{
            const res=await axios.post('http://localhost:8000/login',body);
            console.log(res, typeof res);

        }catch(error){
            console.log('error logging');   
        }
        
    }



  return (
    <div className='flex justify-center '>
    <div className='w-1/4' >
        <h1 className='text-center'>Login</h1>
        <br />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <input type="text" value={userData.username} placeholder='username' name='username' onChange={handleChange}/>
            <input type="password" value={userData.password} placeholder='password' name='password' onChange={handleChange}/>
            <input type="submit" className='bg-blue-400'/>
        </div>
      </form>
    </div>
    </div>
  )
}

export default SignIn
