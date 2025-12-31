import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import DataOption from "../components/DataOption";
import EditModel from "../components/EditModel";
import AiVoice from "../components/AiVoice";
import { CheckCheck, Clock } from "lucide-react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

function ShopkeeperData() {
  const [Data, setData] = useState([]);
  const [NoData, setNoData] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const { id, monthName } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    setData([]);
    setLoading(true);
    setNoData(false);
    try {
      const res = await axios.get(`/shop/shopkeeper/showCustomerProduct`, {
        params: {
          customerId: id,
          Month: monthName,
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

  useEffect(() => {
    fetchData();
  }, [id, monthName]);

  const handleDeleteField = async ({ productEntryId, itemIds }) => {
    try {
      for (let itemId of itemIds) {
        await axios.post("/shop/shopkeeper/FieldDeletion", {
          productEntryId,
          month: monthName,
          itemId,
        });
      }
      fetchData();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error!");
    }
  };

  const handlePaidField = async (entry) => {
    try {
      setLoading(true);
      await axios.post("/shop/shopkeeper/updateStatus", {
        productEntryId: entry._id,
        status: "Paid",
      });
      fetchData();
      toast.success("Hisab Paid successfully");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleUnpaidFiled = async (entry) => {
    try {
      setLoading(true);
      await axios.post("/shop/shopkeeper/updateStatus", {
        productEntryId: entry._id,
        status: "Unpaid",
      });
      fetchData();
      toast.success("Hisab Unpaid successfully!");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleEditField = (entry) => {
    console.log("edit", entry);
    setEditEntry(entry);
    setShowEditModal(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="text-white p-4 relative">
      <div className="relative flex items-center">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          {monthName}
        </h2>
        <div className="ml-auto">
          <AiVoice
            customerId={id}
            monthName={monthName}
            onDataAdded={fetchData}
          />
        </div>
      </div>

      {NoData ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            No monthly data available
          </h2>
          <p className="text-gray-400">No Data added yet!</p>
        </div>
      ) : (
        Data.map((entry, index) => (
          <div
            key={index}
            className="bg-[#0d0e12] rounded-lg p-4 mb-4 border border-white/20"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-[#66FCF1]">
                Date: {new Date(entry.date).toLocaleDateString("en-IN")}
              </p>

              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
    ${
      entry.status === "Paid"
        ? "bg-green-500/15 text-green-400 border border-green-400/30"
        : "bg-red-500/15 text-red-400 border border-red-400/30"
    }
  `}
              >
                {entry.status === "Paid" ? (
                  <CheckCheck size={14} strokeWidth={2.5} />
                ) : (
                  <Clock size={14} strokeWidth={2.5} />
                )}

                <span>{entry.status === "Paid" ? "Paid" : "Unpaid"}</span>
              </div>

              <DataOption
                onPaid={() => handlePaidField(entry)}
                onUnpaid={() => handleUnpaidFiled(entry)}
                onEdit={() => handleEditField(entry)}
                onDelete={(dataToDelete) => handleDeleteField(dataToDelete)}
                data={entry}
                isPaid={entry.status === "Paid"}

              />
            </div>

            <div className="mt-2 space-y-2">
              {entry.items.map((item) => (
                <div
                  key={item._id}
                  className="flex bg-[#192930] px-3 py-2 rounded text-sm text-white font-semibold"
                >
                  <p className="w-1/2 truncate">{item.productName}</p>
                  <p className="w-1/1 text-center">Qty: {item.quantity}</p>
                  <p className="w-1/4 text-right pr-4">₹{item.rate}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 text-right text-[16px] text-[#06ec48] font-bold">
              <span className="text-[#18c2b6] ">Total:</span> ₹{entry.totalAmount}
            </div>
          </div>
        ))
      )}
      {showEditModal && (
        <EditModel
          entry={editEntry}
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}

export default ShopkeeperData;
