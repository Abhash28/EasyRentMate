const createError = require("../utils/error");
const User = require("../model/userSchema");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userData = async (req, res, next) => {
  const { userName, userMobile, userAddress, shopName, rent, password } =
    req.body;
  console.log(userName, userMobile, userAddress, shopName, rent, password);
  if (
    !userName ||
    !userMobile ||
    !userAddress ||
    !shopName ||
    !rent ||
    !password
  ) {
    return next(createError(400, "all field need"));
  }
  const hasedPass = await bcyrpt.hash(password, 10);

  try {
    const response = await User.create({
      adminId: req.admin.id,
      userName,
      userMobile,
      userAddress,
      shopName,
      rent,
      password: hasedPass,
    });
    res.status(200).json({
      success: true,
      message: "user data successfully posted in database",
      response,
    });
    console.log(req.admin.id);
  } catch (error) {
    next(error);
  }
};
const userLogin = async (req, res, next) => {
  const { userMobile, password } = req.body;
  console.log(userMobile, password);
  if (!userMobile || !password) {
    return next(createError(400, "All field need while user login"));
  }
  try {
    const vaildUser = await User.findOne({ userMobile });
    console.log(vaildUser);
    if (!vaildUser) {
      return next(createError(400, "User Not found"));
    }
    const camPass = await bcyrpt.compare(password, vaildUser.password);
    console.log(camPass);
    const token = jwt.sign(
      {
        id: vaildUser._id,
        role: vaildUser.role,
        userName: vaildUser.userName,
        userMobile: vaildUser.userMobile,
        userAddress: vaildUser.userAddress,
        shopName: vaildUser.shopName,
        rent: vaildUser.rent,
      },
      process.env.USER_SECRET_KEY
    );
    console.log(token);
    res
      .cookie("accessUserToken", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: "cookies genrate successfully" });
  } catch (error) {
    next(error);
  }
};
const userLogOut = async (req, res, next) => {
  res
    .clearCookie("accessUserToken")
    .status(200)
    .json({ success: true, message: "User Logout successfull" });
};

const fetchUserData = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const fetchUser = await User.findOne({ _id: userId });
    res
      .status(200)
      .json({ success: true, message: "User fetch successfully", fetchUser });
  } catch (error) {
    next(error);
  }
};
const editUser = async (req, res, next) => {
  const { userName, userMobile, userAddress, shopName, rent } = req.body;
  const { userId } = req.params;
  try {
    const updateUserDetails = await User.findByIdAndUpdate(
      userId,
      {
        userName,
        userMobile,
        userAddress,
        shopName,
        rent,
      },
      { new: true }
    );
    if (!updateUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ updateUserDetails });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deleteUserByAdmin = await User.deleteOne({ _id: userId });
    res.status(200).json({
      success: true,
      message: "User delete sucessfully by admin",
      deleteUserByAdmin,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  userData,
  userLogin,
  userLogOut,
  fetchUserData,
  editUser,
  deleteUser,
};
