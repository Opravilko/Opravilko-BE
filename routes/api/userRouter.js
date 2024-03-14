let express = require('express');
let router = express.Router();

let userController = require('../../controllers/userController');

router.post('/list', userController.list);
router.delete('/delete', userController.delete);
router.put('/update', userController.update);

module.exports = router;
