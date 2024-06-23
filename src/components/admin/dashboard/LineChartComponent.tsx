// components/LineChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', students: 200, teachers: 500},
  { name: 'Tue', students:  300, teachers: 400 },
  { name: 'Wed', students: 400, teachers: 600 },
  { name: 'Thu', students: 700, teachers: 700 },
  { name: 'Fri', students: 900, teachers: 800 },
  { name: 'Sat', students: 800, teachers: 950 },
  { name: 'Sun', students: 900, teachers: 1000 },
];

const LineChartComponent = () => {
  return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 0, right:0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="teachers" stroke="#ff0000" />
          <Line type="monotone" dataKey="students" stroke="#0000ff" />
        </LineChart>
      </ResponsiveContainer>
  );
};

export default LineChartComponent;
