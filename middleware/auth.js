const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if it exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied!!' });
  }

  // If exists, verify
  try {
    console.log(process.env.JWTSECRET);
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    // Mount user if decoded has the user
    req.user = decoded.user;
    next();
  } catch (err) {
    // If token is invalid then it catches
    res.status(401).json({ msg: 'Token Invalid' });
  }
};
