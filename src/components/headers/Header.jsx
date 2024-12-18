import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
const Header = () => {
  const [productName,setProductName]=useState('');
  const state=useContext(GlobalState)
  const [isLogged,setIsLogged]=state.userAPI.isLogged;
  const [isAdmin,setIsAdmin]=state.userAPI.isAdmin;

  const logoutUser=async()=>{
    await axios.get('http://localhost:5000/user/logout');
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    window.location.href='/'
  }
  const AdminRouter=()=>{
    return (
      <>
      <li><Link to='/create_product'>create product</Link></li>
      <li><Link to='/category'>category</Link></li>
      
      </>
    )
  }
  const LoggedRouter=()=>{
    return (
      <>
      <li><Link to='/' className='' onClick={logoutUser}>Logout</Link></li>

      </>
    )
  }



  const handleFormChange=(e)=>{
    setProductName(e.target.value);    
  }
  const handleClickSearch=async()=>{
    
  }
  return (
    <div className='p-2 flex flex-row justify-around bg-black'>
      <Link to="/"><BiSolidShoppingBagAlt className='text-6xl text-orange-600'/></Link>
      <div className="my-2 flex flex-row w-2/6 gap-2 ">
        <input className="grow rounded-sm "type="text" value={productName} onChange={handleFormChange}/>
        <button onClick={handleClickSearch} className="text-white bg-orange-600 rounded-sm p-2">search</button>
      </div>
        <div className='flex flex-row gap-2 my-3 text-white'> 
          {isAdmin && AdminRouter()}
          {
            isLogged ? LoggedRouter():<div><button className="text-white px-2"><Link to="/login">login</Link></button>
            <button className="text-white bg-orange-600 rounded-sm px-2"><Link to="/register">SignUp</Link></button></div>
          }
        </div>
    
    </div>
  )
}

export default Header
