import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Analytics = () => {
  const [risks, setRisks] = useState([]);
  const [period, setPeriod] = useState("All");

  useEffect(() => {
    fetch("http://localhost:8080/api/risks")
      .then((res) => res.json())
      .then((data) => setRisks(data))
      .catch((err) => console.log(err));
  }, []);

  const severityCount = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };

  risks.forEach((risk) => {
    if (severityCount[risk.severity] !== undefined) {
      severityCount[risk.severity]++;
    }
  });

  const pieData = [
    { name: "Low", value: severityCount.Low },
    { name: "Medium", value: severityCount.Medium },
    { name: "High", value: severityCount.High },
    { name: "Critical", value: severityCount.Critical },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Risk Analytics Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Select Period: </label>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option>All</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2>Severity Pie Chart</h2>

          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h2>Severity Bar Chart</h2>

          <ResponsiveContainer width={500} height={400}>
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

             <Bar dataKey="value" fill="#8884d8" barSize={80} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;