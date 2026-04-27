import { useEffect, useState } from "react";
import api from "../services/api";

function RiskList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/risk")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔄 Loading state
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // 📭 Empty state
  if (data.length === 0) {
    return <div className="text-center mt-10">No data found</div>;
  }

  // 📊 Table view
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Risk List</h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Risk Level</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{item.id}</td>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">{item.riskLevel}</td>
              <td className="p-2 border">{item.status}</td>
              <td className="p-2 border">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RiskList;