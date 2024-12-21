import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from './props/ProductCard';
import { GlobalState } from '../GlobalState';
export const Products = () => {
  const state=useContext(GlobalState);
  const [products]=state.productAPI.products
  const [admin]=state.userAPI.isAdmin
  const addCart=state.userAPI.addCart
  const [token]=state.token
  console.log(token)
  return (
    <div className='py-20 justify-center grow flex flex-wrap p-2 gap-2 bg-[#E5E5E5]'> 
   {products.length>0 && products.map((e)=>{
      return(
<Card product={e} key={e._id} admin={admin} cart={addCart} token={token}/>
      );
    })
    }
    </div>
  )
}
