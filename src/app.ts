import express, { Application } from "express";
import { CRequest } from "./Configuration/RequestDataTypes/Request";
import { CResponse } from "./Configuration/RequestDataTypes/Response";
import { auth } from "./Configuration/MiddelWare/Authorize/Auth";
import { configModel } from "./Configuration/Config/configModel";
import { config } from "./Configuration/Config/Config";
import { Server } from "socket.io";
import bodyParser, { BodyParser } from "body-parser";

const jwt = require("jsonwebtoken");
const app: Application = express();
const io = new Server(2000,{cors:{origin:"*",methods:'*'}});

const emailtoSocket = new Map();
const socketToEmail = new Map();

// Lib For Log
const morgan = require("morgan");

// cross-origin-request handeler
var cors = require("cors");

// Controller
const usercontroller = require("./Controller/UserControllers/UserController");
const PostController = require("./Controller/PostControllers/PostController");
const RoleController = require("./Controller/UserControllers/RoleController");

// MiddelWare lib
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// MiddelWare for file upload
const { upload, multiUpload } = require("./Configuration/MiddelWare/fileUpload/FileUpload");

// Inbuild MiddelWare
app.use("/src/Images", express.static("src/Images"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Assign Controllers
app.use("/User", usercontroller);
app.use("/Post", PostController);
app.use("/Role", RoleController);


// socket connection
io.on("connection",(socket)=>{
  socket.on("join-room",(data)=>{
    const { roomId, email } = data;
    emailtoSocket.set(email,socket.id);
    socketToEmail.set(socket.id,email)
    socket.join(roomId);
    socket.emit("joined-room",{roomId});
    socket.broadcast.to(roomId).emit("User-joined",{email});
  });

  socket.on("call-user",(data)=>{
    console.log("socket");
    const {email, offer} = data;
    const fromEmail = socketToEmail.get(socket.id);
    const socketId = emailtoSocket.get(email);
    socket.to(socketId).emit("incomming-call",{from:fromEmail,offer:offer});
  });

  socket.on("call-accepted",(data)=>{
    const {email,ans} = data;
    const socketId = emailtoSocket.get(email);
    socket.to(socketId).emit("call-accept",{ans});
  });
});

// Common function
app.post("/upload", upload.single("file"), (req: CRequest, res: CResponse) => {
  res.json({ path: `${config.Api}/${req.file?.path}` });
});

// logIn and Generate token
app.post("/login", (req: CRequest, res: CResponse) => {
  const user = req.body;
  const token = jwt.sign(user, config.secretKey, { expiresIn: "1800s" });
  res.status(200).json({Token:token});
});

// if request not found
app.all("*", (req: CRequest, res: CResponse) => {
  res.status(404).json({ message: "Resource Not Found" });
});

app.listen(config.port, () => {
  console.log(`Service on ${config.port}`);
});
