import React, { useState, useRef, useEffect } from "react";

function CustomerNameOperation({CustomerId ,onRename, onDelete }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative p-1" ref={dropdownRef}>
      <button
        title="Options"
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
              onRename(CustomerId);
            }}
            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#66FCF1]/10 rounded-xl"
          >
            rename
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
              onDelete(CustomerId);
            }}
            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#66FCF1]/10 rounded-xl"
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerNameOperation;
