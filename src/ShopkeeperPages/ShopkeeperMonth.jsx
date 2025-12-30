import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { Plus , Trash2} from "lucide-react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

function ShopkeeperMonth() {
  const { id } = useParams();
  const [monthData, setMonthData] = useState([]);
  const [NoData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
    const fetchMonthData = async () => {
      setMonthData([]);
      setLoading(true);
      setNoData(false);
      try {
        const res = await axios.get(`/shop/shopkeeper/ShowCustomerMonth`, {
          params: { Customer: id },
        });
        setMonthData(res.data);
      } catch (err) {
        console.error("Error:", err.response?.data?.message);
        if (err.response?.status === 404) {
          setNoData(true);
        } else {
          navigate(-1);
        }
      } finally {
        setLoading(false);
      }
    };
 useEffect(() => {
    fetchMonthData();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleNewMonth = async() => {
    setLoading(true);
    try{
   const res = await  axios.post(`/shop/shopkeeper/NewMonthCreation`,{
    CustomerId:id
   })
   await fetchMonthData()
   toast.success("New month Created")
    }catch(err){
     toast.error(err.response?.data?.message || "Error creating month");
    }
    finally{
      setLoading(false);
    }
  };
  const handleDeleteMonth =async (monthName)=> {
  setLoading(true)
    try{
       const res = await axios.delete(`shop/shopkeeper/customerMonthDel/${id}/${monthName}`)
       fetchMonthData()
       toast.success("Month deleted successfully✅")
    }catch(err){
     toast.err(err.data?.response?.message)
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="h-full w-full p-6 text-white">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleNewMonth}
          className="bg-[#11aca2] p-2 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {NoData ? (
        <div className="flex flex-col items-center justify-center mt-10 text-center">
          <h2 className="text-2xl font-bold mb-2">No Monthly Data Available</h2>
          <p className="text-gray-400">No data has been added yet.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-extrabold mb-6 text-center text-[#66FCF1]">
            Monthly Data
          </h1>

          <div className="space-y-4">
            {monthData.map((entry, index) => (
              <Link
                to={`/Shopkeeper/CustomerData/${entry.customerId}/${entry.month}`}
                key={index}
              >
                <div className="bg-[#0d0e12] rounded-2xl p-5 mt-7 border border-white/10 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                    <h3 className="text-lg font-semibold text-[#66FCF1]">
                      {entry.month}
                    </h3>
                    <div onClick={(e)=> {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteMonth(entry.month)
                    }}>
                <Trash2 className="size-5 text-red-500 cursor-pointer hover:scale-110 transition-transform"/>
                    </div>
                    
                  </div>

                  <div className="space-y-1 text-sm text-gray-200">
                    {
                      entry.totalAmount === 0 ? (<p className=" size-8 pt-1 w-[60px] pl-4 rounded-2xl bg-green-500/15 text-green-400 border border-green-400/30">Paid</p>):( 
                        <p className="font-medium">Total: ₹{entry.totalAmount}</p>
                      )
                    }
                    <p>
                      Last Entry: {new Date(entry.EntryDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopkeeperMonth;
