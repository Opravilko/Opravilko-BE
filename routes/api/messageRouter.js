let express = require('express');
let router = express.Router();

let messageController = require('../../controllers/messageController');

router.post('/send', messageController.send);
router.post('/with', messageController.with);
router.post('/delete', messageController.delete);



module.exports = router;