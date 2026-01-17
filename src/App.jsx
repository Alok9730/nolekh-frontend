import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./ShopkeeperPages/Login";
import SignUp from "./ShopkeeperPages/SignUp"

import { Toaster } from "react-hot-toast";
import { isTokenValid } from "./utils/auth";


import MainLayout from "./layout/MainLayout";
import ShopkeeperDashBoard from "./ShopkeeperPages/ShopkeeperDashBoard";
import ShopkeeperMonth from "./ShopkeeperPages/ShopkeeperMonth";
import ShopkeeperData from "./ShopkeeperPages/ShopkeeperData";

import CustomerGuard from "./components/CustomerGuard";
import CustomerLogin from "./CustomerPages/CustomerLogin"
import CustomerLayout from "./layout/CustomerLayout";
import CustomerMonth from "./CustomerPages/CustomerMonth"
import CustomerData from "./CustomerPages/CustomerData"

import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./ShopkeeperPages/Unauthorized"; 


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenValid(token)) {
       localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Toaster position="bottom-left" reverseOrder={false} />

      <Routes>
        <Route path="/shopkeeper/login" element={<Login />} />
        <Route path="/shopkeeper/SignUp" element={<SignUp />} />
      


        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<PrivateRoute allowedRoles={"shopkeeper"}/>}>
          <Route path="/Shopkeeper" element={<MainLayout />}>
          <Route index element={<ShopkeeperDashBoard />} />
            <Route path="CustomerList" element={<ShopkeeperDashBoard />} />
            <Route path="CustomerMonth/:id" element={<ShopkeeperMonth />} />
            <Route path="CustomerData/:id/:monthName" element={<ShopkeeperData/>} />
          </Route>
        </Route>
 
        <Route path="/Customer/login" element={<CustomerLogin/>}/>
        <Route element={<CustomerGuard/>} >
          <Route path="/Customer" element={<CustomerLayout/>}>
          <Route  index element={<CustomerMonth/>} />
          <Route path="CustomerData/:id/:MonthName" element={<CustomerData/>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/unauthorized" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
