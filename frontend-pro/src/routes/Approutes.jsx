import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BrowseBooks from "../pages/Browsebooks";
import OwnerDashboard from "../pages/OwnerDashboard";
import ConsumerDashboard from "../pages/ConsumerDashboard";
import ProtectedRoute from "./protectedRoutes";
import RoleRoute from "./RoleRoute";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/browse" element={<BrowseBooks />} />

      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="OWNER">
              <OwnerDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/consumer-dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="CONSUMER">
              <ConsumerDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;