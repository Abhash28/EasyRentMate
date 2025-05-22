const mongoose = require("mongoose");
const userModal = new mongoose.Schema({
  adminId: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  userName: {
    type: String,
    require: true,
  },
  userMobile: {
    type: String,
    require: true,
    unique: true,
  },
  userAddress: {
    type: String,
    require: true,
  },
  shopName: {
    type: String,
    require: true,
  },
  rent: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User", userModal);
