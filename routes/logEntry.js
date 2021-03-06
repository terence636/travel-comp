const router = require("express").Router();
const Logs = require("../models/logEntry.model.js");

router.route("/:username")
.get(async (req, res, next) => {
    try {
      const logs = await Logs.find({username: req.params.username});
      res.status(200).json(logs);
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  })

router.route("/")
.get(async (req, res, next) => {
    try {
   
      const logs = await Logs.find({});
      res.status(200).json(logs);

    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  })
.post(async (req, res, next) => {
    try {
      const logEntry = new Logs(req.body);
      const createdEntry = await logEntry.save();
      res.status(200).json(createdEntry);
    } catch (error) {
        console.log(err)
        res.status(400).json(err)
    }
  })
  

  router.route("/:id").delete(async (req, res) => {
      console.log("delete")
    Logs.findByIdAndRemove(req.params.id, (err, deletedMatch) => {
      if (err) {

        res.status(400).json({ error: err.message });
      }
      res.status(200).json(deletedMatch);
      console.log(deletedMatch)
    });
  })



module.exports = router;