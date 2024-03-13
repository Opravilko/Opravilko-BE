let express = require('express');
let router = express.Router();

let photoController = require('../../controllers/exampleController.js');

router.get('/', photoController.list);
router.get('/:id', photoController.show);
router.post('/', photoController.create);
router.put('/:id', photoController.update);
router.delete('/:id', photoController.remove);

module.exports = router;
