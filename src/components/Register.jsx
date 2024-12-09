import React,{useState} from 'react';
import axios from 'axios';
const initialState={
    username:"",
    password:""
}
const Register = () => {
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
            const res=await axios.post('http://localhost:8000/signup',body);
            console.log(res, typeof res);

        }catch(error){
            console.log('error logging');   
        }
        
    }



  return (
    <div>
        <h1>register</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <input type="text" value={userData.username} placeholder='username' name='username' onChange={handleChange}/>
            <input type="password" value={userData.password} placeholder='password' name='password' onChange={handleChange}/>
            <input type="submit" />
        </div>


      </form>
    </div>
  )
}

export default Register
