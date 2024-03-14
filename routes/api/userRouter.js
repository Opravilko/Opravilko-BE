let express = require('express');
let router = express.Router();

let userController = require('../../controllers/userController');

router.post('/list', userController.list);
router.delete('/delete', userController.delete);

module.exports = router;
