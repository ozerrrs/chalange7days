import { Routes, Route, BrowserRouter } from "react-router-dom";
import FirstPage from "./pages/firstPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        {/* <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
