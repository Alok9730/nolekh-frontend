import { useState } from "react";
import { useCustomer } from "../ContextApi/CustomerlistContext";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, KeyRound } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchCustomers } = useCustomer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/shop/shopkeeper/login", { email, password });
      const { token, userId, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      toast.success("Login successful");
      fetchCustomers();
      navigate("/Shopkeeper/CustomerList");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0c10] px-4">
      <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-md border border-[#66FCF1]/20 bg-white/5 shadow-[0_0_30px_#66FCF1]/10 animate-fadeIn">
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide drop-shadow">
          Welcome to <span className="text-[#66FCF1]">noLekh</span>
        </h2>

        <div className="mb-6 relative group">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-[#ffffff] text-black placeholder-black focus:outline-none ring-2 ring-transparent group-focus-within:ring-[#66FCF1] transition-all"
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={22} />
        </div>

        <div className="mb-8 relative group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-[#ffffff] text-black placeholder-black focus:outline-none ring-2 ring-transparent group-focus-within:ring-[#66FCF1] transition-all"
          />
          <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={22} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-lg transition duration-200 shadow-xl
            ${loading
              ? "bg-[#66FCF1]/60 cursor-not-allowed"
              : "bg-[#66FCF1] hover:bg-white hover:text-black hover:shadow-[#66FCF1]/40 text-black"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-6 text-center text-sm text-white/60">
          Not registered?{" "}
          <button
            className="text-[#66FCF1] font-medium hover:underline"
            onClick={() => navigate("/shopkeeper/SignUp")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
