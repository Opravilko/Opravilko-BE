const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

async function checkAuthenticated(req, res, next) {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userID) => {
    if (err) {
      return res.sendStatus(403);
    }

    const found = await UserModel.findById(userID.id);
    if (found) {
      req.user = found;
      return next();
    } else {
      return res.sendStatus(403);
    }
  })
}

module.exports = checkAuthenticated;