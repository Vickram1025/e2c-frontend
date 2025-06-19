import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import Home from "./pages/Home";
import EditItem from "./pages/EditItem";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />

      
        <div className="flex-1  bg-gray-100">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Item" element={<EditItem />} />
            <Route path="/User" element={<User />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
