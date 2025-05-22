import React, { useState } from "react";
import PasswordInput from "./passwordInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    userMobile: "",
    userAddress: "",
    shopName: "",
    rent: "",
    password: "",
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/userdata",
        formData,
        { withCredentials: true }
      );
      console.log("User signup successfully", response);
      setFormData({
        userName: "",
        userMobile: "",
        userAddress: "",
        shopName: "",
        rent: "",
        password: "",
      });
      navigate("/Admin-home");
    } catch (error) {
      console.log("While posting find error", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Shop Owner</h2>
        <form onSubmit={handleCreateUser}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Shop Owner name"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile No:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile no"
              value={formData.userMobile}
              onChange={(e) =>
                setFormData({ ...formData, userMobile: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Home Address:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full address"
              value={formData.userAddress}
              onChange={(e) =>
                setFormData({ ...formData, userAddress: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Shop Type:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Shop name"
              value={formData.shopName}
              onChange={(e) =>
                setFormData({ ...formData, shopName: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rent (Monthly):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Monthly amount"
              value={formData.rent}
              onChange={(e) =>
                setFormData({ ...formData, rent: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <PasswordInput formData={formData} setFormData={setFormData} />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
