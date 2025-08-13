import { createContext, useEffect, useState } from "react";
import { ProductAPI } from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
export const GlobalState=createContext();
export const DataProvider=({children})=>{
const VITE_API_URL = "https://e-commerce-backend-lt4r.onrender.com";
    const [token,setToken]=useState(false);
    const [query, setQuery] = useState(() => {
        // Retrieve the query from localStorage on component mount
        return localStorage.getItem("query") || ""; 
    });
    
    const refreshToken=async()=>{
        try {
            const res=await axios.post(`${VITE_API_URL}/user/refreshtoken`,{},{withCredentials:true});
            console.log(res)
            setToken(res.data.accesstoken)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin');
        console.log(firstLogin)
        if (firstLogin==='true') refreshToken()
    },[])
    const state={
        token:[token,setToken],
        productAPI:ProductAPI(query),
        userAPI:UserAPI(token),
        query:[query,setQuery]
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}