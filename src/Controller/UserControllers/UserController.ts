import express from "express";
import { CRequest } from "../../Modelhealper/Request";
import { CResponse } from "../../Modelhealper/Response";
import { controllerService } from "../../CommonControllerService/CommonControllerService";
import { User } from "../../Structure/Entity/User/User";
import { GenericDomainService } from "../../GenericRepo/GRepo";

const router = express.Router();
const repo = GenericDomainService(User);







// Crud operation
controllerService(User,router);
module.exports = router;