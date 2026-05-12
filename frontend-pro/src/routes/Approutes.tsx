import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BrowseBooks from "../pages/Browsebooks";
import OwnerDashboard from "../pages/OwnerDashboard";
import ConsumerDashboard from "../pages/ConsumerDashboard";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/browse" element={<BrowseBooks />} />

      <Route
        path="/owner-dashboard"
        element={<OwnerDashboard />}
      />

      <Route
        path="/consumer-dashboard"
        element={<ConsumerDashboard />}
      />

    </Routes>
  );
}

export default AppRoutes;