import React, { useContext, useState } from "react";
import { BiSolidShoppingBagAlt, BiCart } from "react-icons/bi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
const VITE_API_URL = "https://e-commerce-backend-lt4r.onrender.com";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [query, setQuery] = state.query;

  const logoutUser = async () => {
    await axios.get(`${VITE_API_URL}/user/logout`);
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    window.location.href = "/";
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickSearch = () => {
    window.localStorage.setItem("query", query);
    window.location.href = "/";
  };

  return (
    <div className="bg-[#E5E5E5] shadow-md">
      <div className="p-2 flex justify-between items-center px-5">
        {/* Logo */}
        <Link to="/" onClick={() => window.localStorage.setItem("query", "")}>
          <BiSolidShoppingBagAlt className="text-6xl text-black" />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex md:self-stretch w-1/3 m-2 ">
      

          <input
            className="grow  rounded-full rounded-r-none outline-none text-sm px-4 "
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            />
          <button
            onClick={handleClickSearch}
            className="text-white bg-black rounded-full rounded-l-none px-4"
            >
            Search
          </button>
          
        </div>

        {/* Menu / Account Options */}
        <div className="relative">
          <button
            className="text-black text-3xl md:hidden"
            onClick={toggleDropdown}
          >
            {dropdownOpen ? <MdClose /> : <HiOutlineMenuAlt3 />}
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-full right-0 bg-[#E5E5E5] w-48 shadow-md rounded-lg transition-transform ${
              dropdownOpen ? "block" : "hidden"
            } md:flex md:items-center md:space-x-4 md:relative md:w-auto md:shadow-none md:top-0`}
          >
            {isAdmin && (
  

              <div className="flex flex-col my-2 space-y-2 md:flex-row md:space-y-0 md:space-x-2 ">
                <Link
                  to="/createProduct"
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                  Create Product
                </Link>
                <Link
                  to="/category"
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                  Category
                </Link>
              </div>
            
            )}
            {isLogged ? (
              <div className="flex flex-col space-y-2 my-2 md:flex-row md:space-y-0 md:space-x-2">
                <button
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
                  onClick={logoutUser}
                  >
                  Logout
                </button>
                <Link
                  to="/cart"
                  className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                  <BiCart className="text-white text-xl" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                <Link
                  to="/login"
                  className="text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex md:hidden my-2 px-5 justify-center h-8 ">
        <input
          className=" rounded-full rounded-r-none outline-none text-sm px-4"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />
        <button
          onClick={handleClickSearch}
          className="text-white bg-black rounded-full rounded-l-none px-4"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
