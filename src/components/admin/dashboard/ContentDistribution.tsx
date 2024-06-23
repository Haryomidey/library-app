// components/ContentDistribution.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Video", value: 65, color: "#8884d8" },
  { name: "Audio", value: 17, color: "#82ca9d" },
  { name: "PDF", value: 15, color: "#ffc658" },
  { name: "Others", value: 3, color: "#ff8042" }
];

const ContentDistribution: React.FC = () => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ContentDistribution;
