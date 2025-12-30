import React, { useEffect, useState } from 'react'
import { Outlet ,Link} from 'react-router-dom'
import axios from "../api/axios"




function CustomerMonth() {
const [monthData , setMonthData] = useState([]);
const [NoData ,setNoData] = useState(true)
const [loading , setLoading] = useState(true)

useEffect(() => {
  const fetchData= async() => {
     setMonthData([]);
      setLoading(true)
      setNoData(false)
  try{
     const res = await  axios.get(`/user/Customer/show-month`);
     setMonthData(res.data)
  }catch(err){
    console.log(err.message)
  toast.error(err.response?.data?.message || "Something went wrong");
        if(err.response?.status === 404){
          setNoData(true);
        }else{
          navigate(-1); 
        }
      }finally{
          setLoading(false)
        }

  } 
  fetchData()
},[])

   if (loading) {
    return <div className="text-white p-4 flex justify-center font-bold text-2xl">Loading monthly data...</div>;
  }
  if(NoData) {
    return (
      <div className="text-white p-4 text-center">
        <h2 className="text-xl font-semibold mb-2">No monthly data available</h2>
        <p className="text-gray-400">No Data added yet!</p>
      </div>
    );
  }


  return (
     <div className="p-4 pt-7">
      <h1 className="text-lg font-bold flex justify-center mb-4 text-[#66FCF1]">Monthly Data</h1>
      {monthData.map((entry, index) => (
       <Link to={`/Customer/CustomerData/${entry.customerId}/${entry.month}`}  key={index}><div
          className="bg-[#0d0e12] rounded-lg p-4 mb-3 border border-white/10"
        >
          <p className="text-lg font-semibold text-[#66FCF1]">Month: {entry.month}</p>
          <p className='text-white'>Total: ₹{entry.totalAmount}</p>
          <p className='text-white'>Last Entry: {new Date(entry.EntryDate).toLocaleDateString("en-IN")}</p>
        </div></Link> 
      ))}
    </div>
  )
}

export default CustomerMonth