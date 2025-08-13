import React, { useEffect, useState } from 'react'
import axios from 'axios';
const VITE_API_URL = "https://e-commerce-backend-lt4r.onrender.com";
export const ProductAPI = (query) => {
    const [products,setProducts]=useState([]);
    console.log(query)
    const getProducts=async()=>{
      try {
        const res = await axios.get(`${VITE_API_URL}/api/products`, {
        params: {'name[regex]': `^${query}`, 'name[options]' : 'i'  }});
    setProducts(res.data);
    console.log(res.data)
        
      } catch (error) {
        console.log(error)
      }
    
    }

    useEffect(()=>{
        getProducts();
    },[])
  return {
    products:[products,setProducts]
  }
}
