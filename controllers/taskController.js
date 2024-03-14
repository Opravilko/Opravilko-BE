require("dotenv").config();
const UserModel = require("../models/user.js");
const TaskModel = require("../models/task.js");

module.exports = {
  //vrne seznam vseh taskov
  list: async function (req, res) {
    const taskFound = await TaskModel.find();
    if (!taskFound) {
      return res.status(500).json({ message: "Error" });
    }

    return res.status(200).json(taskFound);
  },

  // vrne vse taske za določeno osebo
  my: async function (req, res) {
    if (!req.user._id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const taskFound = await TaskModel.find({ users_assigned: req.user._id });

    if (!taskFound) {
      return res.status(500).json({ message: "Error" });
    }

    return res.status(200).json(taskFound);
  },

  // ustvari nov task
  create: async function (req, res) {
    if (!req.user._id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const name = req.body.taskName;
    const start_date = req.body.start_date;
    const due_date = req.body.due_date;
    const description = req.body.description;
    const users_assigned = req.body.users_assigned;
    const project = req.body.projectId;

    if (
      name == null ||
      start_date == null ||
      due_date == null ||
      description == null ||
      users_assigned == null ||
      project == null
    ) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const newTask = new TaskModel({
      name,
      start_date,
      due_date,
      description,
      users_assigned,
      project,
      status: false,
      author: req.user._id,
    });

    const saved = await newTask.save();
    if (saved) {
      return res.status(201).json({ id: saved.id });
    }

    return res.status(500).json({ message: "Error" });
  },

  // posodobi status taska
  updateStatus: async function (req, res) {
    const status = req.body.status;
    const taskId = req.body.taskId;

    if (taskId == null || status == null) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const foundTask = await TaskModel.findOne({
      _id: taskId,
      author: req.user._id,
    });
    if (!foundTask) {
      return res.status(500).json({ message: "Error" });
    }

    foundTask.status = status;

    const saved = await foundTask.save();

    if (saved) {
      return res.status(201).json({ message: "Posodobljeno." });
    }

    return res.status(500).json({ message: "Error" });
  },
  // izbriši task
  delete: async function (req, res) {
    let taskId = req.body.taskId;

    if (taskId == null) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      author: req.user._id,
    });
    if (deletedTask) {
      return res.status(200).json({ message: "Izbrisano" });
    }

    return res.status(500).json({ message: "Error" });
  },
  //dodajanje pik
  points: async function (req, res) {
    const taskFound = await TaskModel.find();
    if (!taskFound) {
      return res.status(500).json({ message: "Error" });
    }

    let points = 0;

    taskFound.forEach((task) => {
      if (task.users_assigned.includes(req.user.name)) {
        points += 1;
      }
    });
    return res.status(200).json({ points });
  },
  //iskanje svijih taskov
  my: async function (req, res) {
    const taskFound = await TaskModel.find();
    if (!taskFound) {
      return res.status(500).json({ message: "Error" });
    }
    const response = taskFound.filter((task) => task.includes(req.user.name));
    return res.status(200).json(response);
  },
};
