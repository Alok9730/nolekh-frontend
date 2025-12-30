import React, { useState } from 'react'

function CustomerRenamePop({onClose, handleSubmit}) {
    const [CustomerNewNameComp,setCustomerNewNameComp] = useState("")
  return (
    <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className=" text-white rounded-2xl p-6 w-[90%] sm:w-[400px] shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-[#66FCF1] text-center">Add New Customer</h2>

        <div className="space-y-4">
          <input
            name="Name"
            type="text"
            placeholder="Customer NewName.."
            value={CustomerNewNameComp}
            onChange={(e) => setCustomerNewNameComp(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white outline-none"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit(CustomerNewNameComp)}
            className="px-4 py-2 rounded-lg bg-[#11aca2] text-black font-semibold hover:bg-[#0d8d8a] transition"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerRenamePop