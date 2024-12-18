import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserAPI = (token) => {
    const [isLogged,setIsLogged]=useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    console.log(token);
    useEffect(()=>{
        
        if(token){
            const getUser=async()=>{
                try {
                    const res=await axios.get('http://localhost:5000/user/info',{
                        headers:{Authorization:token}
                    })
                    setIsLogged(true)
                    if (res.data.role===true) setIsAdmin(true)
                } catch (error) {
                    alert(error)
                }
            }
            getUser();
        }
    })
  return (
   {
      isLogged:[isLogged,setIsLogged],
      isAdmin:[isAdmin,setIsAdmin]
}
  )
}

export default UserAPI
