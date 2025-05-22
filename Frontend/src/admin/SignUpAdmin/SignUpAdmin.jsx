import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUpAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: "",
    adminMobile: "",
    password: "",
  });

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.adminName || !formData.adminMobile || !formData.password) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/adminsignup",
        formData
      );
      console.log("Admin Signup Successfully", response.data);
      navigate("/");
    } catch (error) {
      console.log("While sending data to backend admin signup", error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <form onSubmit={handleSignUpSubmit} className="border p-4 shadow rounded">
        <h1 className="mb-4 text-center">
          Signup,<span className="text-primary"> Admin</span>
        </h1>

        <div className="mb-3">
          <label htmlFor="adminName" className="form-label">
            Name :
          </label>
          <input
            id="adminName"
            type="text"
            className="form-control"
            value={formData.adminName}
            placeholder="Enter Name"
            onChange={(e) => {
              setFormData({ ...formData, adminName: e.target.value });
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="adminMobile" className="form-label">
            Mobile No :
          </label>
          <input
            id="adminMobile"
            type="text"
            className="form-control"
            value={formData.adminMobile}
            placeholder="Enter Mobile number"
            onChange={(e) => {
              setFormData({ ...formData, adminMobile: e.target.value });
            }}
          />
        </div>

        <div className="mb-3">
          <PasswordInput formData={formData} setFormData={setFormData} />
        </div>

        <p className="text-center">
          Already have account?{" "}
          <Link to="/" className="text-decoration-none">
            Login
          </Link>
        </p>

        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignUpAdmin;
