const router = require("express").Router();
const User = require("../models/users.model.js");
const bcrypt = require("bcrypt");

router.route("/").get(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.route("/register").post(async (req, res) => {
  console.log(req.body)
  foundUser = await User.find( {"username" : req.body.username})
  console.log(foundUser)
  if(foundUser.length === 0) {
  try {
    // generate new password
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({ ...req.body, password: hashedPassword });

    //saved and send response
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
  } else {
    res.status(409).json({error: "Username taken"})
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    !foundUser && res.status(401).json("Wrong Username/Password");

    const isValidPassword = bcrypt.compareSync(req.body.password, foundUser.password)

    !isValidPassword && res.status(401).json("Wrong Username/Password");
    res.status(200).json(foundUser);

  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;
