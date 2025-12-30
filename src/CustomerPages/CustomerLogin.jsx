import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, KeyRound } from "lucide-react";

function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("/user/Customer/login", {
        email,
        password,
      });

      const { token, userId, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      toast.success("Login successful");

      navigate("/Customer");

    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#233143]">
      <div className="bg-[#0d0e12] border border-white/20 rounded-2xl p-8 w-full max-w-md max-[500px]:border-0 mb-[100px]">
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">CustomerLogin</h2>

        <div className="mb-4 relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pr-12 pl-4 py-3 rounded-lg bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-black" size={24} />
        </div>

        <div className="mb-6 relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          <KeyRound className="absolute text-black right-3 top-1/2 -translate-y-1/2" size={24} />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black font-bold py-3 rounded-lg hover:text-white hover:bg-[#66FCF1] transition duration-200 shadow-md"
        >
          Login
        </button>

        <div className="relative top-3 flex left-3 gap-2">
          <p className="text-white font-light">Not a member?</p>
          <button
            className="text-[#42716e] hover:text-blue-300 transition duration-200"
            onClick={() => navigate(`/Customer`)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
