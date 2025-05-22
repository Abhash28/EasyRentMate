const express = require("express");
const createError = require("./error");
const jwt = require("jsonwebtoken");
const vaildUser = async (req, res, next) => {
  const tokenUser = req.cookies.accessUserToken;
  console.log(tokenUser);
  if (!tokenUser) {
    return next(createError(404, "Provide vaild  user token"));
  }
  try {
    const verifyUserToken = await jwt.verify(
      tokenUser,
      process.env.USER_SECRET_KEY
    );
    req.user = verifyUserToken;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = vaildUser;
