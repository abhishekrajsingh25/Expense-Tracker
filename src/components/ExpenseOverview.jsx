import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-8 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending over time and analyze your expense trends.
          </p>
        </div>
        <button
          onClick={onAddExpense}
          className="flex items-center gap-1 text-red-700 bg-red-50 p-2 rounded font-semibold cursor-pointer"
        >
          <Plus size={15} className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="mt-10 p-2">
        <CustomLineChart data={chartData} type="expense" />
      </div>
    </div>
  );
};

export default ExpenseOverview;
