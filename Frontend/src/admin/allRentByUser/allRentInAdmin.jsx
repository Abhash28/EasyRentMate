import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AllRentInAdmin() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [rentData, setRentData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    shopName: "",
    userName: "",
    userMobile: "",
    userAddress: "",
    rent: "",
  });

  useEffect(() => {
    fetchAllRent();
    fetchUser();
  }, [userId]);

  const fetchAllRent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/auth/allRentByUser/${userId}`
      );
      setRentData(res.data.fetchAllRentInAdmin);
    } catch (err) {
      console.error("Error fetching rents:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/fetchuser/forAdmin/${userId}`
      );
      setUserData(res.data.fetchUser);
    } catch (error) {
      console.log("Error while fetching user details");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/user/admin/deleteuser/${userId}`
      );
      setShowModal(false);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Error deleting user", error);
      setShowModal(false);
    }
  };

  const handleEditClick = () => {
    if (userData) {
      setEditFormData({
        shopName: userData.shopName || "",
        userName: userData.userName || "",
        userMobile: userData.userMobile || "",
        userAddress: userData.userAddress || "",
        rent: userData.rent || "",
      });
      setShowEditModal(true);
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/user/admin/edituser/${userId}`,
        editFormData
      );
      setShowEditModal(false);
      fetchUser();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleStatus = async (rentId) => {
    const isConfirmed = window.confirm(
      "Are you sure this month's rent is paid?"
    );
    if (!isConfirmed) return;
    try {
      await axios.put(
        `http://localhost:3000/api/monthlyrent/update/rentStatus/${rentId}`,
        { paid: true },
        { withCredentials: true }
      );
      fetchAllRent();
    } catch (error) {
      console.log("Error updating rent status:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="text-primary">User Details</h2>
        <hr />
        {userData ? (
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">{userData.shopName}</h4>
            <p>
              <strong>User Name:</strong> {userData.userName}
            </p>
            <p>
              <strong>Mobile:</strong> {userData.userMobile}
            </p>
            <p>
              <strong>Address:</strong> {userData.userAddress}
            </p>
            <p>
              <strong>Monthly Rent:</strong> ₹{userData.rent}
            </p>
            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-warning" onClick={handleEditClick}>
                ✏️ Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowModal(true)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>

      <div>
        <h2 className="text-primary">Rent History</h2>
        <hr />
        {rentData.length === 0 ? (
          <p>No rent records found.</p>
        ) : (
          <div className="row">
            {rentData.map((rent) => (
              <div className="col-md-6 col-lg-4 mb-4" key={rent._id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{rent.month}</h5>
                    <p>
                      <strong>Rent:</strong> ₹{rent.rent}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          rent.paid ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {rent.paid ? "Paid" : "Pending"}
                      </span>
                    </p>
                    <div className="d-grid">
                      {rent.paid ? (
                        <button className="btn btn-success btn-sm" disabled>
                          ✅ Rent Paid
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-warning btn-sm mb-2"
                            disabled
                          >
                            ⚠️ Pending
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleStatus(rent._id)}
                          >
                            Mark as Paid
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="modal d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal d-block" role="dialog">
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form className="row g-3">
                  {[
                    "shopName",
                    "userName",
                    "userMobile",
                    "userAddress",
                    "rent",
                  ].map((field, idx) => (
                    <div
                      key={idx}
                      className={`col-md-${field === "rent" ? "12" : "6"}`}
                    >
                      <label
                        htmlFor={field}
                        className="form-label text-capitalize"
                      >
                        {field.replace("user", "User ")}
                      </label>
                      <input
                        type={field === "rent" ? "number" : "text"}
                        id={field}
                        name={field}
                        value={editFormData[field]}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </div>
                  ))}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdateUser}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllRentInAdmin;
