import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../CommonController/CommonControllerService";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { Role } from "../../DomainStructure/Entity/User/Role";
import { roleDTO } from "../../DomainStructure/DTOs/User/roleDTO";
import { userDTO } from "../../DomainStructure/DTOs/User/userDTO";

const router = express.Router();
const repo = GenericDomainService(Role);

// coustomGet Eample:
router.get("/coustomGet", async (req: CRequest, res: CResponse) => {
    try {
        const where = {};

        const users:Partial<userDTO> = {firstName:true} 
        const select:Partial<roleDTO> = {RoleName:true,users:users};
        
        const relations:Partial<roleDTO> = {users:true};
        
        const data = await repo.choiceSelect(req,where,select,relations);
        await res.status(200).json(data);
    } catch (err) {
        res.status(500).json({err:"someThing wrong"});
    }
});

// common crud Operation
controllerService(Role, router);
module.exports = router;
