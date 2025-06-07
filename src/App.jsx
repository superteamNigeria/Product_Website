import { Routes, Route } from "react-router-dom"

import HomePage from "./pages/HomePage"
import SubmitPage from "./pages/SubmitPage"
import AdminPage from "./pages/admin/AdminPage"
import CreateProduct from "./pages/admin/create/CreateProductPage"
import UpdateProduct from "./pages/admin/update/[productId]"
import ProductPage from "./components/ProductPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit" element={<SubmitPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/admin/update/:productId" element={<UpdateProduct />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  )
}

export default App
