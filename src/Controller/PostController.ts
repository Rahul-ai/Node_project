import express,{ Request, Response } from "express";
import { controllerService } from "../ControllerService/ControllerService";
import { Post } from "../entity/Post";
import { db } from "../Configuration/dbConfig";
const router = express.Router();

// Crud operation
controllerService(Post,router);

module.exports = router;