import React, { useContext } from 'react'
import { GlobalState } from '../GlobalState'

export const Cart = () => {
    const state=useContext(GlobalState);
    const [cart]= state.userAPI.cart;
    console.log(cart)
  return (
    <div>
        <div>Cart</div>
        <div>
        {
            cart.map(element=>{
                return(
                    <p>cart</p>
                )
            })
        }

        </div>





    </div>
  )
}
