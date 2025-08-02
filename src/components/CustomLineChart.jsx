import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const CustomLineChart = ({ data, type }) => {
  // Clean the month labels by removing any #number suffix
  const cleanedData = data.map((item) => ({
    ...item,
    month: item.month.replace(/#\d+$/, "").trim(),
  }));

  // Aggregate by date
  const aggregatedData = cleanedData.reduce((acc, curr) => {
    const existingEntry = acc.find((item) => item.date === curr.date);
    if (existingEntry) {
      existingEntry[type] += curr[type];
      existingEntry.items = [...existingEntry.items, ...curr.items];
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  const color = type === "income" ? "#7e22ce" : "#dc2626"; // purple for income, red for expense
  const labelText = type === "income" ? "Income" : "Expense";

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={aggregatedData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis />
          <Tooltip
            formatter={(value) => [`₹${value}`, labelText]}
            labelFormatter={(label) => {
              const dataPoint = aggregatedData.find(
                (item) => item.month === label
              );
              return `Date: ${dataPoint?.date || label}`;
            }}
          />
          <Line
            type="monotone"
            dataKey={type}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
