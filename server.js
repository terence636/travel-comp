const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const cors = require("cors");
const httpServer = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(httpServer);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const { addUser, removeUser, getUser, getUsersInRoom } = require('./chat.users')
require("dotenv").config();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});

// Controllers / Routers
const usersRoutes = require("./routes/users.js");
app.use("/users", usersRoutes);
const sessionsRoutes = require("./routes/sessions.js")
app.use("/sessions", sessionsRoutes)

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", (socket) => {

  console.log(`${socket.id} A user is connected`)
  socket.on("disconnectUser", () => {
    // const user = getUser(socket.id)
    console.log(`${socket.id} had left!!`);
    const user = removeUser(socket.id)
    io.to(user.room).emit('message',{ user: 'ADMIN', text: `${user.nickname.toUpperCase()} has left`})
  });

  socket.on("sendMessage", (msg,callback) => {
    console.log(msg)
    const user = getUser(socket.id)
    console.log("allusers",getUsersInRoom(user?.room))
    io.to(user.room).emit('message',{ user: user?.nickname.toUpperCase(), text: msg, colour: user?.colour})
    callback()
  });

  socket.on("join",({nickname, room } , callback)=>{
    // console.log(socket.id)
    const { error, user } = addUser({id:socket.id, nickname, room})
    console.log({error})
    console.log({user})
    console.log("Allusers",getUsersInRoom(user?.room))
    // if(error) return callback(error)
    console.log(`${user.nickname} has join the chat`)
    socket.emit('message', { user: 'ADMIN', text: `${user?.nickname.toUpperCase()}, Welcome to ${user?.room.toUpperCase()}`})
    socket.broadcast.to(user.room).emit('message', {user: 'ADMIN', text: `${user?.nickname.toUpperCase()}, has joined!`})
    socket.join(user?.room)
    callback()
  })
});

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Backend Server Listening on the port", process.env.PORT);
});

// httpServer.listen(3000, () => {
//   console.log('listening on *:3000');
// });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo atlas");
});
