import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const [risk, setRisk] = useState(null);

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
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f6ff",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#5b5be0",
            marginBottom: "30px",
          }}
        >
          Risk Detail
        </h1>

        <div style={{ lineHeight: "2" }}>
          <h3>ID: {risk.id}</h3>

          <h3>Name:</h3>
          <p>{risk.name}</p>

          <h3>Description:</h3>
          <p>{risk.description}</p>

          <h3>Severity:</h3>

          <span
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              color: "white",
              fontWeight: "bold",
              background:
                risk.severity === "CRITICAL"
                  ? "red"
                  : risk.severity === "HIGH"
                  ? "orange"
                  : risk.severity === "MEDIUM"
                  ? "gold"
                  : "green",
            }}
          >
            {risk.severity}
          </span>
        </div>

        <br />
        <br />

        <Link to="/">
          <button
            style={{
              background: "#5b5be0",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Back To Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Detail;