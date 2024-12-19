import React, { useContext } from 'react'
import { GlobalState } from '../GlobalState'

const Cart = () => {
  const state=useContext(GlobalState);
  const [cart,setCart]=state.userAPI.cart;
  console.log(cart)
  const changeQuantity=(event,e)=>{
    setCart([...cart,{...e,[event.target.name]:event.target.value}])
  }
  const handleCheckout=()=>{
    alert('thankyou for shopping with us')
    setCart([]);
    window.location.href='/'
  }
  return (
    <div className='grow'>
      {cart.map(e=>{
      const {img,name,price,quantity}=e
        return (
          <div className=' flex h-1/6 items-center'>
            <img src={img}alt="" className='h-full' />
            <p>{name}</p>
            <p>{price}</p>
            <input type="number" className='border-2' value={quantity} name="quantity" onChange={()=>changeQuantity(e)}/>


          </div>
        )
      })}

      <br />
      <div className='flex grow'>

      <button className='' onClick={handleCheckout}>checkout</button>
      </div>
    </div>
  )
}

export default Cart
