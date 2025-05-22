import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./passwordInput";
import axios from "axios";

function userLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userMobile: "",
    password: "",
  });

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/userLogin",
        formData,
        { withCredentials: true }
      );
      console.log("User login successfully", response);
      navigate("/userhome");
    } catch (error) {
      console.log("While user log facing error", error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <form onSubmit={handleUserLogin} className="border p-4 rounded shadow">
        <h1 className="mb-4 text-center">Login, User</h1>

        <div className="mb-3">
          <label className="form-label">Mobile No :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Mobile No"
            value={formData.userMobile}
            onChange={(e) => {
              setFormData({ ...formData, userMobile: e.target.value });
            }}
            required
          />
        </div>

        <PasswordInput formData={formData} setFormData={setFormData} />

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>
    </div>
  );
}

export default userLogin;
