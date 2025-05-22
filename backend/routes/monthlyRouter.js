const express = require("express");
const {
  addRent,
  fetchAllMonthlyRent,
  rentByUser,
  updateStatus,
} = require("../controller/monthlyCard");
const vaildUser = require("../utils/vailUser");
const vaildAdmin = require("../utils/vaildadmin");
const router = express.Router();

router.post("/add", vaildUser, addRent);
//when login after see all the rent
router.get("/fetchAllRent", vaildUser, fetchAllMonthlyRent);
router.put("/update/rentStatus/:rentId", vaildAdmin, updateStatus);

module.exports = router;
