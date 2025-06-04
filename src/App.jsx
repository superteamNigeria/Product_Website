import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";
import AdminPage from "./pages/admin/AdminPage";
import CreateProduct from "./pages/admin/create/CreateProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit" element={<SubmitPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
  );
}

export default App;
