import { useState } from "react";
import { useCustomer } from "../ContextApi/CustomerlistContext";
import { useNavigate } from "react-router-dom";
import { LogOut,UserRoundPlus } from "lucide-react";
import CustomerAddComponent from "../components/CustomerAddComponent";
import toast from "react-hot-toast";
import axios from "../api/axios";

function ShopkeeperDashBoard() {
  const { SearchQ, SetSearchQ , fetchCustomers} = useCustomer();
  const [CustomerPopUp, SetCustomerPopup] = useState(false);
  const navigate = useNavigate();

  async function handleCustomerAdding({ username, email, phone, password }) {
  if (!username || !email || !phone || !password) {
    return toast.error("Fill the Field Properly!!");
  }

  try {
    const shopkeeperId = localStorage.getItem("userId");
   const res = await axios.post(`shop/shopkeeper/CustomerSignup`, {
  username,
  email,
  phone,
  password,
  shopkeeperId, 
});

    toast.success(res.data.message);

    await fetchCustomers(); 
    SetCustomerPopup(false); 
  } catch (err) {
    toast.error(err?.response?.data?.message || "Internal Issue");
  }
}


  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    toast.success("Logout successfully");

    setTimeout(() => {
      navigate("/shopkeeper/login");
    }, 1000);
  }




  return (
    <div className="w-full  h-full px-4 py-4 flex flex-col overflow-hidden">
      <div className="relative flex items-center justify-center h-16 flex-shrink-0">
        <h2 className="text-4xl font-bold text-white absolute left-1/2 -translate-x-1/2">
          noLekh
        </h2>

        <div className="absolute right-1 top-6 -translate-y-1/2">
          <div
            onClick={handleLogout}
            className="cursor-pointer hover:text-[#a25252]"
          >
            <LogOut size={24} />
          </div>
        </div>
      </div>

      <div className="flex-grow  relative overflow-hidden">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full  sm:px-0 max-w-[90%] sm:max-w-[600px] flex items-center">
          <input
            type="text"
            placeholder="Search Customer..."
            value={SearchQ}
            onChange={(e) => SetSearchQ(e.target.value)}
            className="w-full py-2 pb-10 px-3 sm:py-4 sm:pb-10 sm:px-5 text-white bg-white/20 rounded-2xl outline-none text-left"
          />

          <button className="absolute bottom-3 sm:right-10 sm:top-8 sm:bottom-5  w-10 h-10 sm:w-8 sm:h-8 bg-[#11aca2] rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-xl active:scale-95 hover:ring-2 hover:ring-[#3bbcb3]/60 text-white font-bold">
            <UserRoundPlus size={20} className="text-black mx-auto"  onClick={() => SetCustomerPopup(true)}/>
          </button>
        </div>

      </div>
      
          {CustomerPopUp && (
          <CustomerAddComponent
            onClose={() => SetCustomerPopup(false)}
            handleSubmit={(data) => handleCustomerAdding(data)}
          />
        )}
    </div>
  );
}

export default ShopkeeperDashBoard;
