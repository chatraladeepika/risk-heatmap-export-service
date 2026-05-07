import { BrowserRouter, Routes, Route } from "react-router-dom";
import RiskList from "./pages/RiskList";
import RiskDetail from "./pages/RiskDetail";
import Analytics from "./components/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RiskList />} />
        <Route path="/risk/:id" element={<RiskDetail />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;