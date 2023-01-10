import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewCat from "./pages/cats/ViewCat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:catId" element={<ViewCat />} />
    </Routes>
  );
}

export default App;
