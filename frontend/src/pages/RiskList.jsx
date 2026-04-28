import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/risks";

function RiskList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}?page=${page}&size=5`);
      setData(res.data.content || []); // IMPORTANT
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Risk List (Pagination)</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Prev
      </button>

      <button onClick={() => setPage(page + 1)}>
        Next
      </button>

      <p>Current Page: {page}</p>
    </div>
  );
}

export default RiskList;