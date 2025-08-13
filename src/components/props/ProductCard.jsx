import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;
console.log(VITE_API_URL)
export const Card = ({ product, admin, cart, token }) => {
  const navigate = useNavigate();
  const [updateProduct, setUpdateProduct] = useState(product);
  const { img, price, _id, name } = product;
  const [edit, setEdit] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${VITE_API_URL}/api/products/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Product deleted");
      window.location.href='/'
    } catch (error) {
      alert("Cannot delete product");
    }
  };

  const handleEdit = () => {
    const handleClose = () => {
      setEdit(false);
    };

    const handleFormChange = (e) => {
      setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `${VITE_API_URL}/api/products/${_id}`,
          updateProduct,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        alert("Product updated");
        setEdit(false);
        window.location.href='/'
      } catch (error) {
        alert("Error updating product");
      }
    };

    return (
      <div className="fixed top-0 right-0 h-screen w-screen">
        {/* Background blur */}
        <div className="absolute top-0 right-0 h-full w-full bg-black/50 backdrop-blur-sm"></div>

        {/* Foreground content */}
        <div className="relative flex flex-col justify-center items-center h-full">
          <div className=" h-auto  max-w-md m-3 bg-white p-6 rounded-lg shadow-lg">
            <form
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="img"
                  className="block text-lg font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  name="img"
                  type="text"
                  value={updateProduct.img}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={updateProduct.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-lg font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  value={updateProduct.price}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                  required
                />
              </div>

              <div className="mt-4">
                <input
                  type="submit"
                  value="Update Product"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
                />
              </div>
            </form>
          </div>
            <button
              onClick={handleClose}
              className=" self-center w- max-w-md  text-white bg-red-600 font-semibold text-lg p-2 px-4 rounded-sm"
            >
              Close
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-auto w-full max-w-xs justify-between border-2 p-4 border-none bg-white mx-4 m-2 rounded-lg shadow-md">
      <img
        src={img}
        alt={name}
        className=" h-48 object-contain rounded-lg"
      />

      <div className="flex flex-col justify-start p-2">
        <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
        <h2 className="text-lg text-gray-600 mt-1">{price}</h2>
      </div>

      {/* Conditional buttons for admin and user */}
      {admin ? (
        <div className="flex flex-row justify-around mt-4">
          <button
            className="bg-black py-2 px-4 rounded-full text-white font-semibold"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 py-2 px-4 rounded-full text-white font-semibold"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
          {edit && handleEdit()}
        </div>
      ) : (
        <div className="flex flex-row justify-around mt-4">
          <button
            className="bg-orange-600 py-2 px-4 rounded-full text-white font-semibold"
            onClick={() => cart(product)}
          >
            Buy
          </button>
          <button className="bg-gray-400 py-2 px-4 rounded-full text-white font-semibold">
            <Link to={`/item/${_id}`}>View</Link>
          </button>
        </div>
      )}
    </div>
  );
};
