import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ formData, setFormData }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="mb-3 position-relative">
      <label htmlFor="password" className="form-label">
        Password :
      </label>
      <input
        id="password"
        type={isVisible ? "text" : "password"}
        className="form-control"
        value={formData.password}
        placeholder="Enter Password"
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
      />
      <span
        onClick={handleVisibility}
        style={{
          position: "absolute",
          top: "38px",
          right: "10px",
          cursor: "pointer",
          color: "#666",
        }}
        aria-label={isVisible ? "Hide password" : "Show password"}
      >
        {isVisible ? <FaEye /> : <FaEyeSlash />}
      </span>
    </div>
  );
}

export default PasswordInput;
