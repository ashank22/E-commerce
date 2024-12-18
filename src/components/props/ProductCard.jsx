import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({src,name,price,id}) => {
  return (
    <div className='flex flex-col h-60 w-36 justify-between border-2 p-2 border-none bg-white mx-4'>
    <img src={src} alt="" className='h-auto' />
    <div className='flex flex-row justify-around'>
      <h1>{name}</h1>
      <h1>{price}</h1>
    </div>
    <div className='flex flex-row justify-around'>
      <button className="bg-orange-600 py-1 rounded-full px-3">buy</button>
      <button className='bg-slate-400 py-1 rounded-full px-3'><Link to={`/item/${id}`} >view</Link></button>
    </div>
    </div>
  )
}
