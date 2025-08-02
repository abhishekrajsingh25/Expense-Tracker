import React from "react";
import { addThousandsSeperator } from "../util/util.js";
import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const colors = ["#59168B", "#A0090E", "#016630"];

  const balanceData = [
    {
      label: "Total Balance",
      amount: totalBalance,
    },
    {
      label: "Total Income",
      amount: totalIncome,
    },
    {
      label: "Total Expense",
      amount: totalExpense,
    },
  ];

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-8 mt-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalBalance={`₹${addThousandsSeperator(totalBalance)}`}
        colors={colors}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
