import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setErrorMessage("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a66c2]  ">
      <div className="p-6 bg-white rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
        <p className="mb-4">Password reset mail will be sent to you</p>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Send Reset Email
          </button>
        </form>

        {successMessage && (
          <div className="bg-green-100 p-4 mt-4 rounded">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="bg-red-100 p-4 mt-4 rounded">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
