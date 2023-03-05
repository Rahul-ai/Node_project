import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../CommonController/CommonControllerService";
import { Post } from "../../Structure/Entity/Post/Post";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { User } from "../../Structure/Entity/User/User";
import { IsNull, Not } from "typeorm";

const router = express.Router();
const repo = GenericDomainService(Post);

router.post("/coustomGet", async (req: CRequest, res: CResponse) => {
    try {
        const where = {id:1};
        const select = {};
        const relation = {};
        const reqs = req;
        const data = await repo.choiceSelect(where, select,relation,reqs);
        await res.status(200).json(data);
    } catch (err) {
        res.status(500).json({err:"someThing wrong"});
    }
});



// common crud Operation
controllerService(Post, router);
module.exports = router;
