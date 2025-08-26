import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function AdminStatistics() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/statistics/listings-by-month`);
      setData(
        res.data.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
          }),
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
