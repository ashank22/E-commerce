import { createContext, useEffect, useState } from "react";
import { ProductAPI } from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
export const GlobalState=createContext();
export const DataProvider=({children})=>{

    const [token,setToken]=useState(false);

    
    const refreshToken=async()=>{
        try {
            const res=await axios.post('http://localhost:5000/user/refreshtoken',{},{withCredentials:true});
            console.log(res)
            setToken(res.data.accesstoken)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin');
        console.log(firstLogin)
        if (firstLogin) refreshToken()
    },[])
    const state={
        token:[token,setToken],
        productAPI:ProductAPI(),
        userAPI:UserAPI(token)
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}