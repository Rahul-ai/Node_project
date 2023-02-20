import express from "express";
import { controllerService } from "../ControllerService/ControllerService";
import { User } from "../Entity/User";
import { GenericDomainService } from "../GenericRepo/GRepo";

const router = express.Router();
const repo = GenericDomainService(User);

// Crud operation
controllerService(User,router);

module.exports = router;