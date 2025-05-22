import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminMobile: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/adminlogin",
        formData,
        { withCredentials: true }
      );
      console.log("Login successfully", response.data.message);
      navigate("/Admin-home");
    } catch (error) {
      console.log("Error while login the account(Admin,User)", error);
    }
  };

  const handleforUserLogin = () => {
    navigate("/userlogin");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <form onSubmit={handleLoginSubmit} className="border p-4 rounded shadow">
        <h1 className="mb-4 text-center">Admin Login</h1>

        <div className="mb-3">
          <label htmlFor="adminMobile" className="form-label">
            User Id:
          </label>
          <input
            id="adminMobile"
            type="text"
            className="form-control"
            placeholder="Enter Mobile No"
            value={formData.adminMobile}
            onChange={(e) => {
              setFormData({ ...formData, adminMobile: e.target.value });
            }}
            required
          />
        </div>

        <PasswordInput formData={formData} setFormData={setFormData} />

        <p className="mt-3">
          Signup as admin?{" "}
          <Link to="/signup-admin" className="text-decoration-none">
            SignUp
          </Link>
        </p>

        <button type="submit" className="btn btn-primary w-100 mb-2">
          Login
        </button>

        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={handleforUserLogin}
        >
          For User
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;
