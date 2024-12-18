import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../GlobalState';

const ProductPage = () => {

    const params=useParams();
    const state=useContext(GlobalState);
    const [products]=state.productAPI.products;
    const [detailProduct, setDetailProduct]=useState([]);
    
    useEffect(()=>{
        if (params){
            products.forEach(product=>{
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    },[params,products])
    if (detailProduct.length===0) return null;
    const {img,name,price}=detailProduct;
    return (
        <div className='flex flex-col grow bg-black text-white'>
        <div className='flex flex-row h-1/2  justify-between border-2 p-2 border-none'>
        <img src={img} alt="" className='h-auto' />
        <div className='flex flex-row justify-around'>
          <h1>{name}</h1>
          <h1>{price}</h1>
        </div>
        </div>
          <button className="self-start size-20 bg-orange-600 py-1 rounded-xl px-3 m-3"> <Link to ="/cart">Buy Now</Link> </button>
   
        </div>
      
      )
}

export default ProductPage
