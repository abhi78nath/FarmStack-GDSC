// const express = require("express");
// const bodyParser = require("body-parser");
// const cropAdvisor = require("./api/cropAdvisor");
// const cors = require("cors");

// const dotenv = require("dotenv");
// dotenv.config();
// const mongoose = require("mongoose");

// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// app.use(bodyParser.json());

// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 5000;

// // const connectToMongo=require("./db");
// // connectToMongo();
// // mongoose.connect(process.env.MONGOMY, { useNewUrlParser: true });

// //available Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/feed", require("./routes/feeds"));
// app.use("/api/cropAdvisor", cropAdvisor);

// //chatsystem
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// //chatsystem end here

// app.listen(port, function () {
//   console.log(`Server started on port ${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cropAdvisor = require("./api/cropAdvisor");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const connectToMongo = require("./db");
connectToMongo();
mongoose.connect(process.env.MONGOMY, { useNewUrlParser: true });

//available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/feed", require("./routes/feeds"));
app.use("/api/cropAdvisor", cropAdvisor);
app.use("/api/schemes", require("./api/schemes"));

//chatsystem
const server = http.createServer(app);

  const getLocation = require('./api/currentLoc');

  getLocation().then(location => {
    console.log(location);
  }).catch(error => {
    console.error(error);
  });


  


  // app.use("/loc", "./geolocation");

// app.listen(process.env.port,()=>{
//     console.log("connected to server");
// })

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.attach(server);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    io.in(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

//chatsystem end here

server.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
