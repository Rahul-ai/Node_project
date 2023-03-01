import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../CommonController/CommonControllerService";
import { User } from "../../Structure/Entity/User/User";
import { GenericDomainService } from "../../GenericRepo/GRepo";

const router = express.Router();
const repo = GenericDomainService(User);







// Crud operation
// controllerService(User,router);
module.exports = router;