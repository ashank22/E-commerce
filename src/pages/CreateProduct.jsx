import React, { useContext, useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
const VITE_API_URL = "https://e-commerce-backend-lt4r.onrender.com";
const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [newProduct, setnewProduct] = useState({});
  
  const handleChange = (e) => {
    setnewProduct({ ...newProduct, [e.target.name]: e.target.value });
    console.log(newProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    const res = await axios.post(`${VITE_API_URL}/api/products`, newProduct, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    alert("Product added");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Product</h2>
        <form className="flex flex-col space-y-4" onChange={handleChange} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="img" className="block text-gray-700">Image URL</label>
            <input
              id="img"
              name="img"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter product price"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
