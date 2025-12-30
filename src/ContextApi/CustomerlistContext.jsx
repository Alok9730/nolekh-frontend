import { createContext, useState, useEffect, useContext } from "react";
import { isTokenValid } from "../utils/auth";
import axios from "../api/axios";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [CustomerData, setCustomerData] = useState([]);
  const [SearchQ, SetSearchQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/shop/shopkeeper/allCustomer`);
      setCustomerData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setHasFetched(true);
      setLoading(false);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      fetchCustomers()
    } else {
      setHasFetched(true);
      setLoading(false);
    }
  },[]);

  return (
    <CustomerContext.Provider
      value={{
        CustomerData,
        SearchQ,
        SetSearchQ,
        loading,
        hasFetched,
        fetchCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
