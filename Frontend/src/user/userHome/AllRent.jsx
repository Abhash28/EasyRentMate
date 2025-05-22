import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const AllRent = () => {
  const [rentData, setRentData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    addMonthlyRent();
  }, []);

  useEffect(() => {
    if (rentData.length > 0) {
      fetchUser(rentData[0].userId);
    }
  }, [rentData]);

  const addMonthlyRent = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/monthlyrent/add",
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      fetchMonthlyRent();
    } catch (err) {
      console.error(err);
      setMessage("Error while adding rent");
    }
  };

  const fetchMonthlyRent = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/monthlyrent/fetchAllRent",
        { withCredentials: true }
      );
      setRentData(res.data.fetchAllRentByUser);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch rents");
    }
  };

  const fetchUser = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/fetchuser/forAdmin/${userId}`,
        { withCredentials: true }
      );
      setUserData(res.data.fetchUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="container my-5">
      {/* User Details */}
      {userData ? (
        <div className="card shadow-sm rounded mb-5 border-0 p-4 bg-white">
          <h2 className="mb-3 fw-bold" style={{ color: "grey" }}>
            Name: <span style={{ color: "#0d6efd" }}>{userData.userName}</span>
          </h2>
          <h5 className="mb-4" style={{ color: "grey" }}>
            Shop: <span style={{ color: "#0d6efd" }}>{userData.shopName}</span>
          </h5>

          <div className="row g-3 text-secondary fs-5">
            <div className="col-md-4 d-flex align-items-center">
              <FaPhone className="me-2 text-primary fs-4" />
              <span>{userData.userMobile}</span>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <FaMapMarkerAlt className="me-2 text-primary fs-4" />
              <span>{userData.userAddress}</span>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <FaRupeeSign className="me-2 text-success fs-4" />
              <span className="text-success fw-semibold">
                {userData.rent} / month
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center fst-italic">Loading user details...</p>
      )}
      {/* Monthly Rent Records Title */}
      <h3 className="mb-4 text-center text-secondary fw-semibold">
        Monthly Rent Records
      </h3>

      {/* Monthly Rent Records */}
      {rentData.length === 0 ? (
        <p className="text-center text-muted fst-italic">
          No rent records found.
        </p>
      ) : (
        <div className="row gy-4">
          {rentData.map((rent) => (
            <div key={rent._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm rounded border-0">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-primary fw-bold">
                      {rent.month}
                    </h5>
                    <p className="card-text mb-1 fs-6">
                      <strong>Rent:</strong>{" "}
                      <span className="text-success">₹{rent.rent}</span>
                    </p>
                    <p className="card-text mb-3 fs-6">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          rent.paid ? "bg-success" : "bg-danger"
                        } fs-6`}
                      >
                        {rent.paid ? "Paid" : "Due"}
                      </span>
                    </p>
                  </div>

                  <button
                    className={`btn ${
                      rent.paid ? "btn-outline-secondary" : "btn-primary"
                    } w-100 fw-bold`}
                    disabled={rent.paid}
                    style={{ transition: "all 0.3s ease" }}
                    onMouseEnter={(e) =>
                      !rent.paid && (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      !rent.paid && (e.target.style.backgroundColor = "")
                    }
                  >
                    {rent.paid ? "Paid" : "Pay Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRent;
