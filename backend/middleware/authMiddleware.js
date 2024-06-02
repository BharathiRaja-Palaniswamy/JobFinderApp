const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  res.status(200);
  next();
};
