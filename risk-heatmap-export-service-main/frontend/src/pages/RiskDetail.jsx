import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const [risk, setRisk] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/risks/${id}`)
      .then((response) => {
        setRisk(response.data);
      });
  }, [id]);

  if (!risk) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="detail-container">

    <div className="detail-card">

      <h1 className="detail-title">
        🛡️ Risk Detail
      </h1>

      <div className="detail-row">
        <span className="label">🆔 ID</span>
        <span>{risk.id}</span>
      </div>

      <div className="detail-row">
        <span className="label">📌 Name</span>
        <span>{risk.name}</span>
      </div>

      <div className="detail-row">
        <span className="label">📝 Description</span>
        <span>{risk.description}</span>
      </div>

      <div className="detail-row">
        <span className="label">⚠️ Severity</span>

        <span className={`severity-badge ${risk.severity.toLowerCase()}`}>
          {risk.severity}
        </span>
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back To Dashboard
      </button>

    </div>

  </div>
);
}

export default Detail;