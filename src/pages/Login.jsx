import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrLinkedin } from "react-icons/gr";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Error during login: " + error.message);
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
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-extrabold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded font-bold w-full"
        >
          Login
        </button>

        <div className="mt-4 text-end text-sm">
          <button
            onClick={() => navigate("/forgotpassword")}
            className="text-blue-500 underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 mt-4 rounded-md">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 mt-4 rounded-md">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Login;
