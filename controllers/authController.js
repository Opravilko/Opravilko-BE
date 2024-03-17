require('dotenv').config()
const UserModel = require('../models/user.js');
const JWT = require('jsonwebtoken');

module.exports = {
  // input
  // {
  //   "username": string,
  //   "password": string
  // }
  // output
  // JWT or status code with message
  login: async function (req, res) {
    let name = req.body.username;
    let pass = req.body.password;

    if (name == null || pass == null) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const userFound = await UserModel.findOne({ name });
    if (!userFound) {
      return res.status(409).json({ message: 'Napačno uporabniško ime ali geslo' });
    }

    if (userFound.pass != pass) {
      return res.status(409).json({ message: 'Napačno uporabniško ime ali geslo' });
    }

    const tokenPay = { id: userFound.id };
    const token = JWT.sign(tokenPay, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token: token, user: userFound });
  },

  // input
  // {
  //   "username": string,
  //   "email": string,
  //   "password": string,
  //   "role": string
  // }
  // output
  // status code with message

  register: async function (req, res) {
    let name = req.body.username;
    let email = req.body.email;
    let pass = req.body.password;
    let role = req.body.role;
    if (name == null || email == null || pass == null || role == null) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    const userFound = await UserModel.findOne({ name });
    if (userFound) {
      return res.status(409).json({ message: 'Uporabniško ime že obstaja' });
    }

    const user = new UserModel({ name, email, pass, role });
    const savedUser = await user.save();
    if (savedUser) {
      return res.status(201).json({ message: 'Uporabnik ustvarjen' });
    }
    return res.status(500).json({ message: 'Napaka' });
  }
};
