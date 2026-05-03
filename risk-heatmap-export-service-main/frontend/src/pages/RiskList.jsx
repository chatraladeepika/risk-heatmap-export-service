import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RiskList.css";

const API_URL = "http://localhost:8080/api/risks";

function RiskList() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const [allData, setAllData] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("LOW");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); 

  // 🔹 Fetch Data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}?page=${page}&size=5`);
      setData(res.data);
      setAllData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);



  // 🔹 Add Risk
  const addRisk = async () => {
    if (!name || !description) return;

    await axios.post(API_URL, {
      name,
      description,
      severity,
    });

    setName("");
    setDescription("");
    setSeverity("LOW");

    fetchData();
  };

  // 🔹 Delete
  const deleteRisk = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchData();
  };

  // 🔹 Edit click
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.description);
  };

  // 🔹 Update
  const updateRisk = async (item) => {
  await axios.put(`${API_URL}/${item.id}`, {
    name: item.name,
    description: editText,
    severity: item.severity
  });

  setEditingId(null);
  fetchData();
};

  // 🔹 Search
  const handleSearch = () => {
  if (!search) {
    setData(allData);
    return;
  }

  const filtered = allData.filter(item =>
    (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.description || "").toLowerCase().includes(search.toLowerCase())
  );

  setData(filtered);
};

  return (
    <div className="container">
      <h1 className="title">Risk Management App</h1>

      <h2>Risk List</h2>

      {/* 🔍 Search */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <input
  type="date"
  onChange={(e) => setStartDate(e.target.value)}
/>

<input
  type="date"
  onChange={(e) => setEndDate(e.target.value)}
/>

      <br /><br />

      {/* ➕ Add Risk */}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <button onClick={addRisk}>Add Risk</button>

      {/* 📊 Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td
                className="link"
                onClick={() => navigate(`/risk/${item.id}`)}
              >
                {item.name}
              </td>

              <td>
                {editingId === item.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  item.description
                )}
              </td>

              <td>{item.severity}</td>

              <td>
                {editingId === item.id ? (
                  <button onClick={() => updateRisk(item)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(item)}>Edit</button>
                )}

                <button onClick={() => deleteRisk(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔄 Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Prev
        </button>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>

        <p>Page: {page}</p>
      </div>
    </div>
  );
}

export default RiskList;