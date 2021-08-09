const router = require("express").Router();
const Pin = require("../models/pin.model.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const pin = await Pin.find();
      res.status(200).json(pin);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  .post(async (req, res) => {
    // console.log(req.body)
    const newPin = new Pin(req.body);
    try {
      const savedPin = await newPin.save(newPin);
      res.status(200).json(savedPin);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
