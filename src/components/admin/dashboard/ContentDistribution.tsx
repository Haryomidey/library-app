
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface ContentDistributionProps {
  data: {
    video_count: number;
    pdf_count: number;
    audio_count: number;
    other_count: number;
  };
}

const ContentDistribution: React.FC<ContentDistributionProps> = ({ data }) => {
  const chartData = [
    { name: "Video", value: data?.video_count, color: "#8884d8" },
    { name: "PDF", value: data?.pdf_count, color: "#ffc658" },
    { name: "Audio", value: data?.audio_count, color: "#82ca9d" },
    { name: "Others", value: data?.other_count, color: "#ff8042" }
  ];

  return (
    <ResponsiveContainer width={"100%"}>
      <PieChart>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData?.map((entry, index) => (
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
