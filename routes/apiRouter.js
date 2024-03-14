let express = require("express");
let router = express.Router();

const checkAuthenticated = require("../middleware/checkAuthenticated.js");

let exampleRouter = require("./api/exampleRouter.js");

router.use("/example1", exampleRouter);
router.use("/example_auth", checkAuthenticated, exampleRouter);

let messageRouter = require("./api/messageRouter.js");
router.use("/message", checkAuthenticated, messageRouter);

let taskRouter = require("./api/taskRouter.js");
router.use("/task", checkAuthenticated, taskRouter);

router.get("/", function (req, res) {
  res.status(200).json({ message: "API is working" });
});

module.exports = router;
