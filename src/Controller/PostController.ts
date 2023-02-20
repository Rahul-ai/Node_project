import express from "express";
import { CRequest } from "../EntityInterfaces/Request";
import { CResponse } from "../EntityInterfaces/Response";
import { controllerService } from "../ControllerService/ControllerService";
import { Post } from "../Entity/User/Post";
import { GenericDomainService } from "../GenericRepo/GRepo";

const router = express.Router();
const repo = GenericDomainService(Post)

router.get("/coustomGet",async(req:CRequest,res:CResponse)=>{
    const where :Partial<Post> = {id:`1`};
    const select = { post:true, withDeleted:true }; 
    const data = await repo.choiceSelect(where,select);
    await res.status(200).json(data);
});

// common crud Operation
controllerService(Post,router);

module.exports = router;