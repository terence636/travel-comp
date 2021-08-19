const router = require("express").Router();
const Logs = require("../models/logEntry.model.js");

router.route("/")
.get(async (req, res, next) => {
    try {
        // console.log("here")
      const logs = await Logs.find({});
      res.status(200).json(logs);
    //   console.log({logs})
    //   res.send("ok")
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  })
.post(async (req, res, next) => {
    // console.log(req.body)
    try {
      const logEntry = new Logs(req.body);
      const createdEntry = await logEntry.save();
      res.status(200).json(createdEntry);
    } catch (error) {
        console.log(err)
        res.status(400).json(err)
    //   if (error.name === 'ValidationError') {
    //     res.status(422);
    //   }
    //   next(error);
    }
  })
  
router.route("/:id")
.get(async (req, res, next) => {
    try {
        // console.log("here")
      const logs = await Logs.find({username: req.params.id});
      res.status(200).json(logs);
    //   console.log({logs})
    //   res.send("ok")
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
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