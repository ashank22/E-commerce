import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Card = ({product,admin,cart,token}) => {
  console.log(token)
  const [updateProduct,setUpdateProduct]=useState(product);
  const {img,price,_id,name}=product;
  const [edit,setEdit]=useState(false);

  const handleDelete=async()=>{
    try {
      await axios.delete(`http://localhost:5000/api/products/${_id}`,{
        headers:{
          Authorization:token
        }
      })
      alert('product deleted')
    } catch (error) {
      alert('cannot delete product')
    }
    window.location.href='/'
  }
  const editWd=()=>{
    const handleClose=()=>{
      setEdit(false);
    }
    const handleFormChange=(e)=>{
      setUpdateProduct({...product,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        
        const res=await axios.put(`http://localhost:5000/api/products/${_id}`,updateProduct,{
          headers:{
            Authorization:token
          }
        })
        alert('product updated')
      } catch (error) {
        alert('error updating',error)
      }
      window.location.href='/'
    }




    return(
      <div className='fixed top-0 right-0 h-screen w-screen'>
  {/* Background blur */}
  <div className='absolute top-0 right-0 h-full w-full bg-black/50 backdrop-blur-sm'></div>

  {/* Foreground content */}
  <div className='relative flex justify-center items-center h-full'>
    <div className='h-1/2 m-3 bg-white p-5 rounded shadow-lg'>
      <button onClick={handleClose} className='text-black'>
        Close
      </button>
      <form onChange={handleFormChange} onSubmit={handleSubmit}>
      <label htmlFor="img" >image url</label>
      <input name="img" type="text" value={updateProduct.img} />
      <label htmlFor="img">name</label>
      <input name="name" type="text"value={updateProduct.name} />
      <label htmlFor="img">price</label>
      <input name="price" type="number"value={updateProduct.price} />
      <input type="submit" />
      </form>
    </div>
  </div>
</div>
    )
  }

  return (
    <div className='flex flex-col h-60 w-36 justify-between border-2 p-2 border-none bg-white mx-4'>
    <img src={img} alt="" className='h-auto' />
    <div className='flex flex-row justify-around'>
      <h1>{name}</h1>
      <h1>{price}</h1>
    </div>
    {
      admin?
      <div className='flex flex-row justify-around'>
      <button className="bg-orange-600 py-1 rounded-full px-3" onClick={handleDelete} >delete</button>
      <button className='bg-slate-400 py-1 rounded-full px-3' onClick={()=>setEdit(true)}>edit</button>
      {edit && editWd()}
    </div>
    :
    <div className='flex flex-row justify-around'>
      <button className="bg-orange-600 py-1 rounded-full px-3" onClick={()=>cart(product)}>buy</button>
      <button className='bg-slate-400 py-1 rounded-full px-3'><Link to={`/item/${_id}`} >view</Link></button>
    </div>
    }
    
    </div>
  )
}
