import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AllUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/adminAllUser",
        { withCredentials: true }
      );
      setUsers(response.data.fetchAllUser);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAllRent = (userId) => {
    navigate(`/rentInAdminByUser/${userId}`);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold display-6 text-primary"></h2>

      {users.length === 0 ? (
        <div className="alert alert-info text-center fs-5">No users found.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {users.map((user) => (
            <div
              className="col"
              key={user._id}
              onClick={() => handleAllRent(user._id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 shadow-sm border-primary border-2">
                <div className="card-header bg-primary text-white fs-5 fw-semibold">
                  👤 {user.userName}
                </div>
                <div className="card-body fs-5">
                  <p className="mb-2">
                    <span className="fw-bold">📱 Mobile:</span>{" "}
                    {user.userMobile}
                  </p>
                  <p className="mb-2">
                    <span className="fw-bold">📍 Address:</span>{" "}
                    {user.userAddress}
                  </p>
                  <p className="mb-2">
                    <span className="fw-bold">🏪 Shop Name:</span>{" "}
                    {user.shopName}
                  </p>
                  <p className="mb-0">
                    <span className="fw-bold">💰 Monthly Rent:</span>{" "}
                    <span className="text-success fw-bold">₹{user.rent}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllUser;
