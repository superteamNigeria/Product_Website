import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";
import AdminPage from "./pages/admin/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit" element={<SubmitPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
