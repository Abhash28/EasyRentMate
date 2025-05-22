const express = require("express");
const {
  adminSignUp,
  adminLogin,
  adminLogout,
  AllUser,
  rentByUser,
} = require("../controller/adminSignUp");
const vaildAdmin = require("../utils/vaildadmin");

//import routes
const router = express.Router();

//all router for admin
router.post("/adminsignup", adminSignUp);
router.post("/adminlogin", adminLogin);

router.get("/adminlogout", vaildAdmin, adminLogout);

//fetch all user create by admin
router.get("/adminAllUser", vaildAdmin, AllUser);
//when admin click on perticular user the show all rent by user
router.get("/allRentByUser/:userId", rentByUser);

module.exports = router;
