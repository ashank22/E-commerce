import React, { useContext } from "react";
import { GlobalState } from "../GlobalState";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;

  console.log(cart);

  const changeQuantity = (event, item) => {
    const newCart = cart.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, [event.target.name]: event.target.value }
        : cartItem
    );
    setCart(newCart);
  };

  const handleCheckout = () => {
    alert("Thank you for shopping with us");
    setCart([]); // Empty the cart after checkout
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center bg-[#E5E5E5] min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {cart.map((e, index) => {
            const { img, name, price, quantity } = e;
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={img}
                  alt={name}
                  className="h-40 w-auto object-contain mb-4"
                />
                <h3 className="text-lg font-medium">{name}</h3>
                <p className="text-gray-600 mb-2">Price: ₹{price}</p>
                <div className="flex items-center space-x-2">
                  <label htmlFor={`quantity-${index}`} className="text-gray-600">
                    Qty:
                  </label>
                  <input
                    id={`quantity-${index}`}
                    type="number"
                    className="w-16 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    value={quantity}
                    name="quantity"
                    onChange={(event) => changeQuantity(event, e)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cart.length > 0 && (
        <button
          className="mt-6 bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-200"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
