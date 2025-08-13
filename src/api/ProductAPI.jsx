import React, { useEffect, useState } from 'react'
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
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
