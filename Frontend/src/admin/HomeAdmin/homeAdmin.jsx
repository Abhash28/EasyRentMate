import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AllUser from "../AllUser/allUser";
import "bootstrap/dist/css/bootstrap.min.css";

function HomeAdmin() {
  const navigate = useNavigate();

  const handleAddUserBtn = () => {
    navigate("/add-user");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/adminlogout",
        { withCredentials: true }
      );
      console.log("Logout successfully", response);
      navigate("/");
    } catch (error) {
      console.log("Error while logout", error);
    }
  };

  return (
    <div className="container my-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 text-primary">Dashboard</h1>
        <div>
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={handleAddUserBtn}
          >
            Add User
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* AllUser Component */}
      <AllUser />
    </div>
  );
}

export default HomeAdmin;
