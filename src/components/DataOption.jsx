import { useState, useRef, useEffect } from "react";

function DataOption({ onPaid, onUnpaid, onEdit, onDelete, data, isPaid }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);

    const itemIds = data.items.map((item) => item._id);
    onDelete({ productEntryId: data._id, itemIds });
  };

  return (
    <div className="relative p-1" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        className="text-white hover:text-[#66FCF1] text-xl"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-[#1f2a36] rounded-2xl shadow-md border border-white/10 z-10">

        
          <button
            disabled={isPaid}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isPaid) onPaid();
              setOpen(false);
            }}
            className={`w-full px-4 py-2 text-left text-sm rounded-xl
              ${
                isPaid
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "text-white hover:bg-[#66FCF1]/10"
              }
            `}
          >
            Paid
          </button>

          
          <button
            disabled={!isPaid}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isPaid) onUnpaid();
              setOpen(false);
            }}
            className={`w-full px-4 py-2 text-left text-sm rounded-xl
              ${
                !isPaid
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "text-white hover:bg-[#66FCF1]/10"
              }
            `}
          >
            Unpaid
          </button>

    
          <button
            disabled={isPaid}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isPaid) onEdit();
              setOpen(false);
            }}
            className={`w-full px-4 py-2 text-left text-sm rounded-xl
              ${
                isPaid
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "text-white hover:bg-[#66FCF1]/10"
              }
            `}
          >
            Edit
          </button>

          <button
            onClick={handleDeleteClick}
            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 rounded-xl"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default DataOption;
