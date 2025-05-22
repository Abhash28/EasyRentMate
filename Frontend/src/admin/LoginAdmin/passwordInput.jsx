import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ formData, setFormData }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password:
      </label>
      <div className="input-group">
        <input
          id="password"
          type={isVisible ? "text" : "password"}
          className="form-control"
          placeholder="Enter Password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          required
        />
        <span
          className="input-group-text"
          style={{ cursor: "pointer" }}
          onClick={handleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
    </div>
  );
}

export default PasswordInput;
