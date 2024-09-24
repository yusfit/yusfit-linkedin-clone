import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GrLinkedin } from "react-icons/gr";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSuccessMessage(
        "Signup successful! Welcome, " + userCredential.user.email
      );
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setErrorMessage("Error during sign-up: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a66c2] ">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl text-white font-bold   ">Linked</h1>
        <GrLinkedin className="text-3xl text-white  " />
      </div>
      <h2 className="text-2xl font-bold text-center text-white mb-6 mt-4">
        Make the most of your Professional life
      </h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="text-sm text-center">
            By clicking Agree & Join, you agree to the LinkedinClone User
            <span className="text-[#0a66c2]">
              Agreement, Privacy Policy & Cookies Policy
            </span>
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Agree & Join
          </button>
        </form>

        {successMessage && (
          <div className="bg-green-500 text-center text-white p-4 mt-4 rounded-md font-semibold">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 mt-4 rounded-md">
            {errorMessage}
          </div>
        )}

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
