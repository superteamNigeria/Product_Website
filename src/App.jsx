import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";
import AdminPage from "./pages/admin/AdminPage";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit" element={<SubmitPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
