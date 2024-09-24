import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgotpassword from "./pages/ForgotPassword";
import MyNetwork from "./pages/MyNetwork";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/network" element={<MyNetwork />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
    </Routes>
  );
}

export default App;
