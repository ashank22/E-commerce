import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from './props/ProductCard';
import { GlobalState } from '../GlobalState';
export const Products = () => {
  const state=useContext(GlobalState);
  const [products]=state.productAPI.products
  return (
    <div className='grow flex flex-wrap p-2 gap-2 bg-black'> 
   { products.map((e)=>{
      return(
<Card src={e.img} name={e.name} price={e.price} id={e._id} key={e._id}/>
      );
    })
    }
    </div>
  )
}
