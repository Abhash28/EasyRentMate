const { createError } = require("./error");
const jwt = require("jsonwebtoken");
const vaildAdmin = (req, res, next) => {
  const token = req.cookies.adminAccessCookie;
  console.log(token);
  if (!token) {
    return next(createError(400, "no token provided"));
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = verified;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = vaildAdmin;
