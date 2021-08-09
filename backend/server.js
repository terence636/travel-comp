const express = require("express");
const path = require('path');
const app = express();
const mongoose = require("mongoose");
// const session = require("express-session");
const methodOverride = require("method-override");
const cors = require("cors");

require("dotenv").config();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// Controllers / Routers
const pinRoutes = require("./routes/pin.js");
app.use("/pin", pinRoutes);
const usersRoutes = require("./routes/users.js");
app.use("/user", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log("Backend Server Listening on the port", process.env.PORT);
}); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  mongoose.connection.once("open", () => {
    console.log("connected to mongo atlas");
  });