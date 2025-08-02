import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import { Search } from "lucide-react";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("date");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortOrder,
        sortField,
      });

      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transactions</h2>
        </div>
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the filters</h5>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setTransactions([]);
                }}
                id="type"
                className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="startdate"
              >
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="startdate"
                className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="enddate"
              >
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                id="enddate"
                className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="sortfield"
              >
                Sort Field
              </label>
              <select
                id="sortfield"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="type">Type</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="sortorder"
              >
                Sort Order
              </label>
              <select
                id="sortorder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="keyword"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
                />
              </div>

              <button
                onClick={handleSearch}
                className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-500 text-white rounded flex items-center justify-center cursor-pointer"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Transactions</h5>
          </div>
          {transactions.length === 0 && !loading ? (
            <p className="text-gray-500">
              Select the filters to view transactions
            </p>
          ) : (
            transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                icon={transaction.icon}
                title={transaction.title}
                date={moment(transaction.date).format("Do MMM YYYY")}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn={true} // Assuming we don't want delete button in filter view
              />
            ))
          )}
          {loading ? (
            <p className="text-gray-500">Loading transactions...</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
