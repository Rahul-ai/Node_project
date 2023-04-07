import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../CommonController/CommonControllerService";
import { Post } from "../../DomainStructure/Entity/Post/Post";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { User } from "../../DomainStructure/Entity/User/User";
import { IsNull, Not } from "typeorm";

const router = express.Router();
const repo = GenericDomainService(Post);

// common crud Operation
controllerService(Post, router);
module.exports = router;
