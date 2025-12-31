import { useState, useEffect } from "react";
import axios from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

function EditEntryDialog({ entry, onClose, onSuccess }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry) {
      setItems(entry.items.map((item) => ({ ...item })));
    }
  }, [entry]);

  const handleChange = (index, field, value) => {
    console.log(index, field, value);
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/shop/shopkeeper/updateEntry", {
        productEntryId: entry._id,
        items,
      });
      toast.success("Entry updated successfully");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Failed to update entry");
    }
  };

  if (!entry) return null;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#0d0e12] w-full max-w-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-[#66FCF1] mb-4">Edit Entry</h2>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {items.map((item, index) => (
            <div
              key={item._id}
              className="bg-[#192930] p-3 rounded-xl space-y-2"
            >
              <input
                value={item.productName}
                onChange={(e) =>
                  handleChange(index, "productName", e.target.value)
                }
                className="w-full bg-black/30 px-3 py-2 rounded text-white"
                placeholder="Product name"
              />

              <div className="flex gap-2">
                <input
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                  className="w-1/2 bg-black/30 px-3 py-2 rounded text-white"
                  placeholder="Qty"
                />

                <input
                  value={item.rate}
                  onChange={(e) =>
                    handleChange(index, "rate", Number(e.target.value))
                  }
                  className="w-1/2 bg-black/30 px-3 py-2 rounded text-white"
                  placeholder="Rate"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-500/20 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-[#66FCF1] text-black font-bold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEntryDialog;
