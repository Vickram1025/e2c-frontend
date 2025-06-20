import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import Home from "./pages/Home";
import EditItem from "./pages/EditItem";
import User from "./pages/User";
import ForgotPassword from "./Component/ForgotPassword";

import ProtectedRoute from "./ProtectedRoute";

import ResetPassword from "./Component/ResetPassword";
import Login from "./Component/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 bg-gray-100">
                  <Home />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/item"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 bg-gray-100">
                  <EditItem />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 bg-gray-100">
                  <User />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
