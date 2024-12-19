import React, { useContext, useState } from 'react'
import { GlobalState } from '../GlobalState';
import axios from 'axios';


const CreateProduct = () => {
  const state=useContext(GlobalState);
  const [token]=state.token
  const [newProduct,setnewProduct]=useState({});
  const handleChange=(e)=>{
    setnewProduct({...newProduct,[e.target.name]:e.target.value})
    console.log(newProduct);
    
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(newProduct)
    const res=await axios.post('http://localhost:5000/api/products',newProduct,{
      headers:{
        Authorization:token
      }
    });
    console.log(res)
    alert('product added');
    window.location.href='/'
  }
  return (
    <div className=' grow ' >
      <form className='items-start m-2 flex flex-col' onChange={handleChange} onSubmit={handleSubmit}>

      <input id="img" name="img" type="text" className='border-2' />
      <label for="img">image url</label>
      <input id='name' name='name' type="text" className='border-2'/>
      <label for="name">name</label>
      <input id='price' name='price' type="number" className='border-2' />
      <label for="price"  >price</label>
      <input type="submit" />


      </form>
  
    </div>
  )
}

export default CreateProduct
