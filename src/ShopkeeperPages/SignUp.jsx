import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound, Phone, User } from "lucide-react";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, phone, password } = formData;

    if (!username || !email || !phone || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post("/shop/shopkeeper/shopkeepersignup", formData);
      toast.success("Signup successful");
      navigate("/shopkeeper/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0c10] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md border border-[#66FCF1]/20 bg-white/5 shadow-[0_0_30px_#66FCF1]/10 animate-fadeIn">
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide drop-shadow">
          Create your <span className="text-[#66FCF1]">noLekh</span> Account
        </h2>

        <div className="mb-5 relative group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-black placeholder-black focus:outline-none ring-2 ring-transparent group-focus-within:ring-[#66FCF1] transition-all"
          />
          <User className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={22} />
        </div>

        <div className="mb-5 relative group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-black placeholder-black focus:outline-none ring-2 ring-transparent group-focus-within:ring-[#66FCF1] transition-all"
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={22} />
        </div>

        <div className="mb-5 relative group">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-black placeholder-black focus:outline-none ring-2 ring-transparent group-focus-within:ring-[#66FCF1] transition-all"
          />
          <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={22} />
        </div>

        <div className="mb-7 relative group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-black placeholder-black focus:outline-none ring-2 ring-transparent group-focus-within:ring-[#66FCF1] transition-all"
          />
          <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={22} />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 font-semibold text-black rounded-lg bg-[#66FCF1] hover:bg-white hover:text-black transition duration-200 shadow-xl hover:shadow-[#66FCF1]/40"
        >
          Signup
        </button>


        <div className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <button
            className="text-[#66FCF1] font-medium hover:underline"
            onClick={() => navigate("/shopkeeper/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
