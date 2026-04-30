import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AddBook from "./pages/addBook";
import Dashboard from "./pages/dashBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-book" element={<AddBook />}/>
        <Route path="dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;