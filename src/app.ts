import express, { Application } from "express";
import { CRequest } from "./Modelhealper/Request";
import { CResponse } from "./Modelhealper/Response";
import { auth } from "./MiddelWare/Authorize/Auth";

const jwt = require("jsonwebtoken");
const app: Application = express();

// Lib For Log
const morgan = require("morgan");

// cross-origin-request handeler
var cors = require("cors");

//Config file
const config = require("./Configuration/Config");

// Controller
const usercontroller = require("./Controller/UserControllers/UserController");
const PostController = require("./Controller/PostControllers/PostController");
const RoleController = require("./Controller/UserControllers/RoleController");

// MiddelWare lib
app.use(cors());
app.use(morgan("tiny"));

// MiddelWare for file upload
const { upload, multiUpload } = require("./MiddelWare/fileUpload/FileUpload");

// Inbuild MiddelWare
app.use("/src/Images", express.static("src/Images"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Assign Controllers
app.use("/User", usercontroller);
app.use("/Post", PostController);
app.use("/Role", RoleController);

// Common function
app.post("/upload", upload.single("file"), (req: CRequest, res: CResponse) => {
  res.json({ path: `${config.Api}/${req.file?.path}` });
});

// logIn and Generate token
app.post("/login", (req: CRequest, res: CResponse) => {
  const user = req.body
  console.log(req.body)
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
