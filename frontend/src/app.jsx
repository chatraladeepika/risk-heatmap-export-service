import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import List from "./pages/List";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <h1>My App</h1>

      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;