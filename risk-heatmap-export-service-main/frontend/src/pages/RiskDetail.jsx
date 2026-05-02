import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:8080/api/risks";

function RiskDetail() {
  const { id } = useParams();
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    fetchRisk();
  }, []);

  const fetchRisk = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setRisk(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!risk) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Risk Detail</h2>

      <p><b>ID:</b> {risk.id}</p>
      <p><b>Name:</b> {risk.name}</p>
      <p><b>Description:</b> {risk.description}</p>

      {/* ✅ Severity Badge */}
      <p>
        <b>Severity:</b>{" "}
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor:
              risk.severity === "HIGH"
                ? "red"
                : risk.severity === "MEDIUM"
                ? "orange"
                : "green",
            color: "white",
          }}
        >
          {risk.severity}
        </span>
      </p>
    </div>
  );
}

export default RiskDetail;