import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserAPI = (token) => {
    const [isLogged,setIsLogged]=useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    const [cart,setCart]=useState([]);
    const addCart = (product) => {
        if (!isLogged) return alert("Please log in first.");
        
        const check = cart.every(item => item._id !== product._id    );

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]);
            alert('item added to cart')
        } else {
            alert("This product has already been added to the cart.");
        }
    };
    useEffect(()=>{
        
        if(token){
            const getUser=async()=>{
                try {
                    const res=await axios.get('http://localhost:5000/user/info',{
                        headers:{Authorization:token}
                    })
                    setIsLogged(true)
                    if (res.data.role===true) setIsAdmin(true)
                } catch (error) {
                    alert(error)
                }
            }
            getUser();
        }
    })
  return (
   {
      isLogged:[isLogged,setIsLogged],
      isAdmin:[isAdmin,setIsAdmin],
      addCart: addCart,
      cart:[cart,setCart]
}
  )
}

export default UserAPI
