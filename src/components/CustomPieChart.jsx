import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({ data, totalBalance, colors }) => {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Donut center content via SVG foreignObject */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={1}
            dataKey="amount"
            nameKey="label"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors && colors[index % colors.length]}
              />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Absolute center overlay */}
      <div className="absolute text-center">
        <p className="text-sm text-gray-500">Total Balance</p>
        <p className="text-2xl font-bold">{totalBalance}</p>
      </div>
    </div>
  );
};

export default CustomPieChart;
