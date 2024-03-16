require('dotenv').config()
const UserModel = require('../models/user.js');

module.exports = {
  // out
  // list uporabnikov
  list: async function (req, res) {
    const userFound = await UserModel.find({}, { _id: 0, name: 1 });
    if (!userFound) {
      return res.status(500).json({ message: 'Napaka' });
    }
    const ret = userFound.map(user => user.name);
    return res.status(200).json(ret);
  },

  // input
  // {
  //    "name": "string", 
  //    "token": "string"
  // } 
  // output
  // message

  delete: async function (req, res) {
    let name = req.body.name; 
    if (!name) {
        return res.status(400).json({ message: 'Bad Request' });
    }
    try {
        const deletedUser = await UserModel.findOneAndDelete({ name: name }); 
        if (deletedUser) {
            return res.status(200).json({ message: 'Izbrisan' });
        } else {
            return res.status(404).json({ message: 'Uporabnik ne obstaja' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Napaka', error: error.message });
    }
  },

  // input
  // {
  //    "oldUsername": "string",
  //    "name": "string",
  //    "email": "string@example.com",
  //    "password": "string",
  //    "role": "string",
  //    "token": "string"
  // }
  // output
  // message in podatki uporabnika

  update: async function (req, res) {
    const { name, email, pass, role } = req.body;
    const oldUsername = req.body.oldUsername; 

    try {
        const user = await UserModel.findOne({ name: oldUsername });
        if (!user) {
            return res.status(404).json({ message: 'Uporabnik ne obstaja' });
        }

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (pass) {
            user.pass = pass;
        }
        if (role) {
            user.role = role;
        }
        await user.save();

        return res.status(200).json({ message: 'Uporabnik posodobljen', user: user });
    } catch (error) {
        return res.status(500).json({ message: 'Napaka', error: error.message });
    }
}
};
