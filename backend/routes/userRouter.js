const express = require("express");
const {
  userData,
  userLogin,
  userLogOut,
  fetchUserData,
  editUser,
  deleteUser,
} = require("../controller/userData");
const vaildAdmin = require("../utils/vaildadmin");
const vaildUser = require("../utils/vailUser");

const router = express.Router();
//vaildation requierd here because of this req done by user
router.post("/userData", vaildAdmin, userData);
//here not because of this only done by
router.post("/userLogin", userLogin);
router.get("/userlogout", vaildUser, userLogOut);
router.get("/fetchuser/forAdmin/:userId", fetchUserData);
router.put("/admin/edituser/:userId", editUser);
router.delete("/admin/deleteuser/:userId", deleteUser);
module.exports = router;
