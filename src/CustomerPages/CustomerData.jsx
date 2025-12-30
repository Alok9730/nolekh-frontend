import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

function CustomerData() {
  const [Data, setData] = useState([]);
  const [NoData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id, MonthName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setData([]);
      setLoading(true);
      setNoData(false);
      try {
        const res = await axios.get(`/user/Customer/Data`, {
          params: {
            Month: MonthName,
          },
        });
        setData(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setNoData(true);
        } else {
          toast.error(err.response?.data?.message || "Server Error");
          navigate(-1);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, MonthName]);

  if (loading) {
    return (
      <div className="text-white p-4 flex justify-center font-bold text-2xl">
        Loading monthly data...
      </div>
    );
  }

  if (NoData) {
    return (
      <div className="text-white p-4 text-center">
        <h2 className="text-xl font-semibold mb-2">
          No monthly data available
        </h2>
        <p className="text-gray-400">No Data added yet!</p>
      </div>
    );
  }

  return (
    <div className="text-white p-4 pt-7">
      <h2 className="text-[20px] font-bold mb-3 flex justify-center text-[#5efff4]">
        {MonthName}
      </h2>

      {Data.map((entry, index) => (
        <div
          key={index}
          className="bg-[#0d0e12] rounded-lg p-4 mb-4 border border-white/10"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold text-[#66FCF1]">
              Date: {new Date(entry.date).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div className="mt-2 space-y-2">
            {entry.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between bg-[#1f2a36] px-3 py-2 rounded"
              >
                <p>{item.productName}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.rate}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 text-right text-[#66FCF1] font-bold">
            Total: ₹{entry.totalAmount}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerData;
