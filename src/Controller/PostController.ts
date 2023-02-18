import express,{ Request, Response } from "express";
import { controllerService } from "../ControllerService/ControllerService";
import { Post } from "../entity/Post";
import { db } from "../Configuration/dbConfig";
import { GenericDomainService } from "../GenericRepo/GRepo";

const router = express.Router();
const repo = GenericDomainService(Post)

router.get("/coustomGet",async(req:Request,res:Response)=>{
    const where = {id:2};
    const select = {post:true};
    const data = await repo.choiceSelect(where,select);
    await res.status(200).json(data);
});

// common crud Operation
controllerService(Post,router);

module.exports = router;