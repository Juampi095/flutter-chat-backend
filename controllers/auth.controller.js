const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const User = require("../models/user.model");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }
    const user = new User(req.body);

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const logIn = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDb = await User.findOne({ email });
    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }
    const vaildPassword = bcrypt.compareSync(password, userDb.password);
    if (!vaildPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password is not valid",
      });
    }

    //Generar JWT
    const token = await generateJWT(userDb.id);
    res.json({
      ok: true,
      user: userDb,
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "talk to the administrator",
    });
  }
};

const renewJWT = async (req, res = response) => {
  const uid = req.uid;

  //Generar un nuevo token
  const token = await generateJWT(uid);

  const user = await User.findById(uid);
  res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = { createUser, logIn, renewJWT };
