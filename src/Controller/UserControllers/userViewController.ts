import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../../CommonController/CommonControllerService";
import { User } from "../../DomainStructure/Entity/User/User";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { userView } from "../../DomainStructure/Entity/TableViews/userView";

const router = express.Router();
const repo = GenericDomainService(userView);

// Crud operation
controllerService(userView,router);
export const userviewController = router;