import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllRent from "./AllRent";

function UserHome() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/userlogout",
        { withCredentials: true }
      );
      console.log("User logout successfully", response);
      navigate("/userlogin");
    } catch (error) {
      console.log("while user logout facing error", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <AllRent />
    </div>
  );
}

export default UserHome;
