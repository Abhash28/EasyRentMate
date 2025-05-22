import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navBar";
import HomeAdmin from "./admin/HomeAdmin/homeAdmin";
import "./App.css";
import LoginAdmin from "./admin/LoginAdmin/LoginAdmin";
import AddUser from "./admin/addUser/addUser";
import SignUpAdmin from "./admin/SignUpAdmin/SignUpAdmin";
import AllRentInAdmin from "./admin/allRentByUser/allRentInAdmin";
import UserLogin from "./user/userLogin/userLogin";
import UserHome from "./user/userHome/userHome";
import AllUser from "./admin/AllUser/allUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/signup-admin" element={<SignUpAdmin />} />
        <Route path="/admin-home" element={<HomeAdmin />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/allUser" element={<AllUser />} />
        <Route path="/rentInAdminByUser/:userId" element={<AllRentInAdmin />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
