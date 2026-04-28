import { useEffect, useState } from "react";
import axios from "axios";

function RiskList() {
  const [data, setData] = useState([]);

  // Load data
  const loadData = () => {
    axios.get("http://localhost:8080/api/risks")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  // DELETE
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/risks/${id}`)
      .then(() => loadData())
      .catch(err => console.log(err));
  };

  // EDIT
  const handleEdit = (item) => {
    const newName = prompt("Enter new name", item.name);
    const newDesc = prompt("Enter new description", item.description);

    if (!newName) return;

    axios.put(`http://localhost:8080/api/risks/${item.id}`, {
      name: newName,
      description: newDesc,
      deleted: false
    }).then(() => loadData())
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Risk List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                {" "}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default RiskList;