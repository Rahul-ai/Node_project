import express from "express";
import { CRequest } from "../../Modelhealper/Request";
import { CResponse } from "../../Modelhealper/Response";
import { controllerService } from "../../CommonControllerService/CommonControllerService";
import { Post } from "../../Structure/Entity/Post/Post";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { Role } from "../../Structure/Entity/User/Role";

const router = express.Router();
const repo = GenericDomainService(Role);


// coustomGet Eample:
router.get("/coustomGet", async (req: CRequest, res: CResponse) => {
    try {
        const where = { id : 1 };
        const select = {RoleName:true,users:{firstName:true}};
        const relations = {users:true};
        const data = await repo.choiceSelect(where,select,relations);
        await res.status(200).json(data);
    } catch (err) {
        res.status(500).json({err:"someThing wrong"});
    }
});

// common crud Operation
controllerService(Role, router);
module.exports = router;
