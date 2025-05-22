import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ formData, setFormData }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="mb-3 position-relative">
      <label className="form-label">Password :</label>
      <input
        type={isVisible ? "text" : "password"}
        placeholder="Enter Password"
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
        className="form-control"
      />
      <span
        onClick={handleVisibility}
        style={{
          position: "absolute",
          top: "38px",
          right: "10px",
          cursor: "pointer",
          color: "#6c757d",
          userSelect: "none",
        }}
        aria-label={isVisible ? "Hide password" : "Show password"}
      >
        {isVisible ? <FaEye /> : <FaEyeSlash />}
      </span>
    </div>
  );
}

export default PasswordInput;
