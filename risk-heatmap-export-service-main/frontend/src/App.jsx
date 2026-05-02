import { BrowserRouter, Routes, Route } from "react-router-dom";
import RiskList from "./pages/RiskList";
import RiskDetail from "./pages/RiskDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RiskList />} />
        <Route path="/risk/:id" element={<RiskDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;