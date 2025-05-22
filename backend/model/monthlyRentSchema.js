const mongoose = require("mongoose");
const MonthlyRentSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  month: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("MonthlyRent", MonthlyRentSchema);
