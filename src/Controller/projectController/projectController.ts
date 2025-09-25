import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../../CommonController/CommonControllerService";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { User } from "../../DomainStructure/Entity/User/User";
import { IsNull, Not } from "typeorm";
import { SecurityLog } from "../../DomainStructure/Entity/SecurityLog/SecurityLog";
import { PageInfo } from "../../DomainStructure/Entity/PageInfo/pageInfo";
import { project } from "../../DomainStructure/Entity/Project/project";

const router = express.Router();
// common crud Operation
controllerService(project, router);
export const projectController = router;
