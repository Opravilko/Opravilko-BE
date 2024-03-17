require('dotenv').config()
const UserModel = require('../models/user.js');
const MessageModel = require('../models/message.js');
const PicMsgModel = require('../models/messagePicture.js')

module.exports = {

  // toUser
  // message
  send: async function (req, res) {
    const toUser = req.body.toUser;
    const message = req.body.message;
    if (toUser == null || message == null) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    const toUserFound = await UserModel.findOne({ name: toUser });
    if (!toUserFound) return res.status(400).json({ message: 'Bad Request' });

    const newMessage = new MessageModel({
      message,
      created_at: new Date(),
      userFrom: req.user.id,
      userTo: toUserFound.id
    });

    const savedMessage = await newMessage.save();
    if (savedMessage) {
      return res.status(201).json({ message });
    }

    return res.status(500).json({ message: 'Error' });
  },

  //OPTIONAL
  
  sendPicture: async function (req, res) {
    const toUser = req.body.toUser;
    const picUrl = req.body.pic;
    if (toUser == null || message == null) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    const toUserFound = await UserModel.findOne({ name: toUser });
    if (!toUserFound) return res.status(400).json({ message: 'Bad Request' });

    const newPicture = new PicMsgModel({
      created_at: new Date(),
      userFrom: req.user.id,
      userTo: toUserFound.id,
      url: picUrl
    });

    const savedMessage = await newPicture.save();
    if (savedMessage) {
      return res.status(201).json({ message });
    }

    return res.status(500).json({ message: 'Error' });
  },

  with: async function (req, res) {
    let user = req.body.user;
    if (user == null) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const userFound = await UserModel.findOne({ name: user });
    if (!userFound) return res.status(400).json({ message: 'Bad Request' });

    let messagesFromHimToMe = await MessageModel.find({ userFrom: userFound.id, userTo: req.user.id }, { userFrom: 0, userTo: 0, __v: 0 });

    const messagesFromHimToMeName = messagesFromHimToMe.map((user) => {
      return {
        id: user.id,
        message: user.message,
        created_at: user.created_at,
        user: userFound.name
      };
    });

    let messagesFromMeToHim = await MessageModel.find({ userFrom: req.user.id, userTo: userFound.id }, { userFrom: 0, userTo: 0, __v: 0 });

    const messagesFromMeToHimName = messagesFromMeToHim.map((user) => {
      return {
        id: user.id,
        message: user.message,
        created_at: user.created_at,
        user: req.user.name
      };
    });

    const comb = messagesFromHimToMeName.concat(messagesFromMeToHimName);

    return res.status(201).json(comb);
  },

  //OPTIONAL
  
  withPic: async function (req, res) {
    let user = req.body.user;
    if (user == null) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const userFound = await UserModel.findOne({ name: user });
    if (!userFound) return res.status(400).json({ message: 'Bad Request' });

    let picFromHimToMe = await PicMsgModel.find({ userFrom: userFound.id, userTo: req.user.id }, { userFrom: 0, userTo: 0, __v: 0 });

    const picFromHimToMeName = picFromHimToMe.map((user) => {
      return {
        id: user.id,
        created_at: user.created_at,
        user: userFound.name,
        url: user.url
      };
    });

    let picFromMeToHim = await PicMsgModel.find({ userFrom: req.user.id, userTo: userFound.id }, { userFrom: 0, userTo: 0, __v: 0 });

    const picFromMeToHimName = picFromMeToHim.map((user) => {
      return {
        id: user.id,
        created_at: user.created_at,
        user: req.user.name,
        url: user.url
      };
    });

    const comb = picFromHimToMeName.concat(picFromMeToHimName);

    return res.status(201).json(comb);
  },

  delete: async function (req, res) {
    let messageId = req.body.messageId;
    if (messageId == null) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    const deletedMessage = await MessageModel.findOneAndDelete({ _id: messageId, userFrom: req.user.id });
    if (deletedMessage) {
      return res.status(200).json({ message: 'Deleted' });
    }

    return res.status(500).json({ message: 'Error' });
  },
};
