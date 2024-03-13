let express = require('express');
let router = express.Router();

const checkAuthenticated = require('../middleware/checkAuthenticated.js');

let exampleRouter = require('./api/exampleRouter.js');

router.use('/example1', exampleRouter);
router.use('/example_auth', checkAuthenticated, exampleRouter);

router.get('/', function (req, res) {
  res.status(200).json({ message: 'API is working' });
});

module.exports = router;