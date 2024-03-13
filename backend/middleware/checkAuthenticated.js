

async function checkAuthenticated(req, res, next) {
  // if (!req.JWT) {
  //   return res.status(404).json({ message: 'NOT LOGIN' });
  // }
  //req.user = req.JWT;
  /*
  ce je JWT token v req ga unhasi da dobis user id ce ne pa vrni not logdin
  */

  return next();

}

module.exports = checkAuthenticated;