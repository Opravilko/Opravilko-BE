let express = require("express");
let router = express.Router();

let taskController = require("../../controllers/taskController.js");

router.post("/list", taskController.list);
router.post("/create", taskController.create);
router.post("/updateStatus", taskController.updateStatus);
router.post("/delete", taskController.delete);
router.post("/points", taskController.points);
router.post("/my", taskController.my);

module.exports = router;
