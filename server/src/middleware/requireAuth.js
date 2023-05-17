const jwt = require('jsonwebtoken');
const errlog = require('debug')('ticketmango:error');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: 'Authorization token required' });
    return;
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    errlog(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
