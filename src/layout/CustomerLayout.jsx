import React from "react";
import { Outlet, useNavigate ,Link} from "react-router-dom";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

function CustomerLayout() {
  const navigate = useNavigate();

  
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    toast.success("Logout successfully");

    setTimeout(() => {
      navigate("/Customer/login");
    }, 1000);
  }
  return (
    <div className="bg-[#233143] min-h-screen ">
      <div className=" fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-5 pt-2">
          <Link to={`/Customer`} ><h2 className="text-[#ffffff] text-[20px] font-bold">noLekh</h2></Link>

          <span
            onClick={handleLogout}
              title="logout"
            className="cursor-pointer hover:text-[#61b5af] text-[#66FCF1] "
          >
            <LogOut size={22} />
          </span>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerLayout;
