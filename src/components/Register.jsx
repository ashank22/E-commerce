import React, { useState } from "react";
import axios from "axios";
const VITE_API_URL = process.env.VITE_API_URL || 'http://localhost:5000';

// It's good practice to define initialState outside the component
// so it's not recreated on every render.
const initialState = {
  username: "",
  password: "",
  role: false,
};

const Register = () => {
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button on submit

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
      setError("Both username and password are required.");
      return;
    }

    setIsSubmitting(true); // Disable the button
    setError(null); // Reset error before submitting

    // --- FIX ---
    // 1. Create a separate variable for the data to be submitted.
    let submissionData = { ...userData };

    // 2. Apply any special logic to this new variable.
    if (submissionData.username === "doom") {
      submissionData.role = true;
    }
    // --- END FIX ---

    try {
      // 3. Send the corrected data to the server.
      const res = await axios.post(`${VITE_API_URL}/user/register`, submissionData);
      console.log(res);

      // 4. On success, perform post-submission actions.
      localStorage.setItem("firstRegister", "true");
      // Clearing the form is often not needed if you redirect immediately.
      // setUserData(initialState); 
      window.location.href = '/'; // Redirect after successful registration

    } catch (error) {
      console.error("Error during registration:", error);
      // Provide more specific error feedback if possible
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      setIsSubmitting(false); // Re-enable the button on failure
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <input
              className="h-12 text-black border-b-2 border-gray-300 focus:outline-none focus:border-orange-500 p-3 transition-colors"
              type="text"
              value={userData.username}
              placeholder="Username"
              name="username"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <input
              className="h-12 text-black border-b-2 border-gray-300 focus:outline-none focus:border-orange-500 p-3 transition-colors"
              type="password"
              value={userData.password}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            
            {/* Display error message if any */}
            {error && <p className="text-red-500 text-sm text-center -my-2">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 mt-4 disabled:bg-gray-400"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;