import { useEffect, useState } from "react";

function List() {
  const [risks, setRisks] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  // LOAD DATA
  const fetchRisks = (pageNo = 0) => {
    fetch(`http://localhost:8080/api/risks?page=${pageNo}&size=2`)
      .then(res => res.json())
      .then(data => {
        setRisks(data.content);
        setPage(pageNo);
      });
  };

  useEffect(() => {
    fetchRisks();
  }, []);

  // ADD
  const addRisk = () => {
    fetch("http://localhost:8080/api/risks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "New Risk",
        description: "Added from UI"
      })
    }).then(() => fetchRisks(page));
  };

  // DELETE
  const deleteRisk = (id) => {
    fetch(`http://localhost:8080/api/risks/${id}`, {
      method: "DELETE"
    }).then(() => fetchRisks(page));
  };

  // SEARCH
  const searchRisk = () => {
    if (!search) {
      fetchRisks();
      return;
    }

    fetch(`http://localhost:8080/api/risks/search?q=${search}`)
      .then(res => res.json())
      .then(data => setRisks(data));
  };

  return (
    <div>
      <h2>Risk List</h2>

      {/* SEARCH */}
      <input
        placeholder="Search risk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchRisk}>Search</button>

      <hr />

      {/* ADD */}
      <button onClick={addRisk}>Add Risk</button>

      <hr />

      {/* LIST */}
      {risks.map((risk) => (
        <div key={risk.id} style={{ marginBottom: "10px" }}>
          <h3>{risk.name}</h3>
          <p>{risk.description}</p>

          <button onClick={() => deleteRisk(risk.id)}>Delete</button>
        </div>
      ))}

      <hr />

      {/* PAGINATION */}
      <button onClick={() => fetchRisks(page - 1)} disabled={page === 0}>
        Prev
      </button>

      <span> Page {page + 1} </span>

      <button onClick={() => fetchRisks(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default List;