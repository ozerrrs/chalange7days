import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewScan from "./components/pages/NewScan";
import Layout from "./components/layouts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<NewScan />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
