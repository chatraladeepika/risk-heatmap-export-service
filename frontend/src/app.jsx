import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/risks";

function App() {
  const [risks, setRisks] = useState([]);

  const fetchRisks = async () => {
    const res = await axios.get(API_URL);
    setRisks(res.data);
  };

  useEffect(() => {
    fetchRisks();
  }, []);

  // ➕ Add Risk
  const addRisk = async () => {
    const name = prompt("Enter name");
    const description = prompt("Enter description");

    if (!name) return;

    await axios.post(API_URL, {
      name,
      description,
      deleted: false,
    });

    fetchRisks();
  };

  // ✏️ Edit Risk
  const editRisk = async (id) => {
    const description = prompt("Enter new description");

    if (!description) return;

    await axios.put(`${API_URL}/${id}`, {
      name: "Updated Risk",
      description,
      deleted: false,
    });

    fetchRisks();
  };

  // ❌ Delete Risk
  const deleteRisk = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchRisks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Risk List</h2>

      <button onClick={addRisk}>Add Risk</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id}>
              <td>{risk.id}</td>
              <td>{risk.name}</td>
              <td>{risk.description}</td>
              <td>
                <button onClick={() => editRisk(risk.id)}>Edit</button>
                <button onClick={() => deleteRisk(risk.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;