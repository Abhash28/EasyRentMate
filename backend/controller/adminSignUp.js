const adminSchema = require("../model/adminSchema");
const monthlyRentSchema = require("../model/monthlyRentSchema");
const User = require("../model/userSchema");
const createError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSignUp = async (req, res, next) => {
  const { adminName, adminMobile, password } = req.body;
  console.log(adminName, adminMobile, password);
  if (!adminName || !adminMobile || !password) {
    return next(createError(400, "All field required"));
  }
  const hashedPass = await bcrypt.hash(password, 10);
  console.log(hashedPass);
  try {
    const response = await adminSchema.create({
      adminName,
      adminMobile,
      password: hashedPass,
    });
    res.status(200).json({
      success: true,
      message: "Admin signup successfull",
      response,
    });
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  const { adminMobile, password } = req.body;
  console.log(adminMobile, password);
  if (!adminMobile || !password) {
    return next(createError(400, "All field requierd for login"));
  }
  try {
    const vaildAdmin = await adminSchema.findOne({ adminMobile });
    console.log(vaildAdmin);
    if (!vaildAdmin) {
      return next(createError(404, "Admin not found"));
    }
    const isPasswordMatch = await bcrypt.compare(password, vaildAdmin.password);
    if (!isPasswordMatch) {
      return next(createError(400, "Password not match"));
    }
    const token = jwt.sign(
      {
        id: vaildAdmin._id,
        adminName: vaildAdmin.adminName,
        adminMobile: vaildAdmin.adminMobile,
        role: vaildAdmin.role,
      },
      process.env.SECRET_KEY
    );
    console.log(token);
    res
      .cookie("adminAccessCookie", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "successfully login with sending cookies to client",
      });
  } catch (error) {
    next(error);
  }
};
const adminLogout = async (req, res, next) => {
  try {
    res
      .clearCookie("adminAccessCookie")
      .status(200)
      .json({ success: true, message: "Admin Logout successfull" });
  } catch (error) {
    next(error);
  }
};

const AllUser = async (req, res, next) => {
  //req.admin is store the admin token in admin token fetch id for perticullar admin
  const adminId = req.admin.id;
  try {
    const fetchAllUser = await User.find({ adminId });
    res.status(200).json({
      success: true,
      message: "All user fetching successfully",
      fetchAllUser,
    });
  } catch (error) {
    next(error);
  }
};

//when admin click on perticular user then show all rent by month in admin panal
const rentByUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const fetchAllRentInAdmin = await monthlyRentSchema.find({ userId });
    res.status(200).json({
      status: true,
      message: "Fetch all monthly rent by user ",
      fetchAllRentInAdmin,
    });
  } catch (error) {}
};

module.exports = { adminSignUp, adminLogin, adminLogout, AllUser, rentByUser };
