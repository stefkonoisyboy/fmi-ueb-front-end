import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import ProtectedRoutes from "./components/shared/ProtectedRoutes/ProtectedRoutes";
import AddProduct from "./pages/AddProduct/AddProduct";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<UpdateProduct />} />
          </Route>
        </Routes>
      </MainLayout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
