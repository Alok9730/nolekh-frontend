import { useState, useMemo, useEffect } from "react";
import { useCustomer } from "../ContextApi/CustomerlistContext";
import CustomerNameOperation from "../components/CustomerNameOperation";
import CustomerRenamePop from "../components/CustomerRenamePop";
import { Menu } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "../api/axios";
import toast from "react-hot-toast";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    CustomerData,
    SearchQ,
    SetSearchQ,
    loading,
    hasFetched,
    fetchCustomers,
  } = useCustomer();
  const [RenameComponentPopup, setRenameComponentPopUp] = useState(false);
  const [CustomerRenameId, setCustomerId] = useState("");
  const [OperationLoading, setOperationLoading] = useState(false);

  const FilterData = useMemo(() => {
    return CustomerData.filter((cust) =>
      cust.username.toLowerCase().includes(SearchQ.toLowerCase())
    );
  }, [CustomerData, SearchQ]);

  async function handleRenameCustomer(CustomerNewName) {
    if (!CustomerNewName || !CustomerRenameId)
      return toast.error("Fill the Filed Properly!");

    try {
      setOperationLoading(true);
      const res = await axios.put("/shop/shopkeeper/renameCustomer", {
        id: CustomerRenameId,
        newName: CustomerNewName,
      });
      setRenameComponentPopUp(false);
      fetchCustomers();
      toast.success("Rename SuccessFully ✅");
    } catch (err) {
      console.log(err.message);
    } finally {
      setOperationLoading(false);
    }
  }

  async function deleteFunction(id){
    console.log(id)
  if(!id) return  console.log("User not exist")
  setOperationLoading(true)
    try{
      await axios.delete(`/shop/shopkeeper/customerDelete/${id}`);
      fetchCustomers()
      toast.success("user deleted!!")
    }catch(err){
     toast.error(err.data?.response?.message)
    }finally{
      setOperationLoading(false)
    }
  }

  if (loading || !hasFetched) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-dvh bg-[#000000] text-white ">
      {!sidebarOpen && (
        <div className="absolute top-4 left-4 z-50">
          <Menu
            size={28}
            onClick={() => setSidebarOpen(true)}
            className="text-white cursor-pointer"
          />
        </div>
      )}

      <div
        className={`bg-[#181818] transition-all duration-300 ease-in-out h-full z-30  overflow-y-auto ${
          sidebarOpen ? "w-[350px] p-4" : "w-0 p-0"
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between mb-4">
          <Link to="/Shopkeeper">
            <h1 className="text-[25px] font-bold">noLekh</h1>
          </Link>
          <Menu
            size={26}
            className="cursor-pointer text-[#66FCF1]"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#66FCF1] to-transparent my-3 mx-auto" />

        <div className="space-y-4 mt-6 ">
          {!hasFetched ? (
            <p>Customer loading</p>
          ) : CustomerData.length === 0 ? (
            <div className="text-center text-sm text-gray-400 mt-6">
              No customers found
            </div>
          ) : (
            FilterData.map((list, index) => (
              <div
                key={index}
                className="flex justify-between space-y-3  hover:bg-[#292929] rounded-xl"
              >
                <div className="pl-2 overflow-x-hidden  ">
                  <Link
                    to={`/Shopkeeper/CustomerMonth/${list._id}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div>
                      <h2 className="font-semibold text-[18px]">
                        {list.username}
                      </h2>
                    </div>
                  </Link>
                  <p className="text-sm text-[#a1a1a1]">
                    {new Date(list.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="mr-2 ">
                  <CustomerNameOperation
                    CustomerId={list._id}
                    onRename={(CustomerId) => {
                      setCustomerId(CustomerId), setRenameComponentPopUp(true);
                    }}
                    onDelete={(CustomerId) => deleteFunction(CustomerId)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 h-full overflow-y-auto">
        {OperationLoading && <LoadingSpinner />}
        <Outlet />
        {RenameComponentPopup && (
          <div>
            <CustomerRenamePop
              onClose={() => setRenameComponentPopUp(false)}
              handleSubmit={(CustomerNewNameComp) => {
                handleRenameCustomer(CustomerNewNameComp);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
