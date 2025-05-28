import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit" element={<SubmitPage />} />
    </Routes>
  );
}

export default App;
