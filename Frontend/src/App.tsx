import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VaultDashboard from "./Pages/VaultDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<VaultDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
