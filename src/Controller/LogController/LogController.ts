import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../../CommonController/CommonControllerService";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { User } from "../../DomainStructure/Entity/User/User";
import { IsNull, Not } from "typeorm";
import { SecurityLog } from "../../DomainStructure/Entity/SecurityLog/SecurityLog";

const router = express.Router();
// common crud Operation
controllerService(SecurityLog, router);
export const logController = router;
