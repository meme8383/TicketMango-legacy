const jwt = require('jsonwebtoken');
const errlog = require('debug')('ticketmango:error');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    // No authorization header
    res.status(401).json({ error: 'Authorization token required' });
    return;
  }

  // Get JWT from header
  const token = authorization.split(' ')[1];

  try {
    // Verify JWT and get user ID
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    // Invalid or expired JWT
    errlog(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
