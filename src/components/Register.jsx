import React, { useState } from "react";
import axios from "axios";


const initialState = {
  username: "",
  password: "",
  role: false,
};

const Register = () => {
 
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState(null); // For displaying errors

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userData.username || !userData.password) {
      setError("Both fields are required");
      return;
    }

    setError(null); // Reset error before submitting
    const body = userData;
    setUserData(initialState);

    try {
      const res = await axios.post("http://localhost:5000/user/register", body);
      console.log(res);
      localStorage.setItem("firstRegister", "true");
      window.location.href='/' // Redirect after successful registration
    } catch (error) {
      console.log("Error during registration");
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E5E5E5]">
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <input
              className="h-12 text-black border-b-2 border-gray-500 focus:outline-none  p-3"
              type="text"
              value={userData.username}
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              className="h-12 text-black border-b-2 border-gray-500 focus:outline-none  p-3"
              type="password"
              value={userData.password}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            
            {/* Display error message if any */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="h-12 bg-black text-white rounded-md shadow-md hover:bg-orange-700 transition duration-300 mt-4"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
