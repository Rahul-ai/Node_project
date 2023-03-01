import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../CommonControllerService/CommonControllerService";
import { Post } from "../../Structure/Entity/Post/Post";
import { GenericDomainService } from "../GenericRepo/GRepo";
import { User } from "../../Structure/Entity/User/User";

const router = express.Router();
const repo = GenericDomainService(Post);

router.get("/coustomGet", async (req: CRequest, res: CResponse) => {
    try {
        const where = { id: 1 };
        const select = { post: true };
        const data = await repo.choiceSelect(where, select);
        await res.status(200).json(data);
    } catch (err) {
        res.status(500).json({err:"someThing wrong"});
    }
});



// common crud Operation
controllerService(Post, router);
module.exports = router;
