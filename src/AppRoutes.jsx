import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import Home from "./pages/Home";
import EditItem from "./pages/EditItem";
import User from "./pages/User";
import ForgotPassword from "./Component/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "./Component/ResetPassword";
import Login from "./Component/Login";
import Banking from "./pages/Banking";

// Reusable layout for protected routes
const Layout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 bg-gray-100">{children}</div>
  </div>
);

function RouterComponent() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/item"
          element={
            <ProtectedRoute>
              <Layout>
                <EditItem />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Layout>
                <User />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking"
          element={
            <ProtectedRoute>
              <Layout>
                <Banking />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 - Page Not Found */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center text-red-600 text-2xl">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
