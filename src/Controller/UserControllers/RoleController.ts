import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../../CommonController/CommonControllerService";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { Role } from "../../DomainStructure/Entity/User/Role";
import { FindOptionsRelations,FindOptionsSelectProperty,FindOptionsSelect, Like } from "typeorm";
import { UserRole } from "../../DomainStructure/Entity/User/UserRole";

const router = express.Router();
const repo = GenericDomainService(Role);

// coustomGet Eample:
router.get("/coustomGet", async (req: CRequest, res: CResponse) => {
    try {
        const user:FindOptionsSelect<UserRole> = {user_id:true,user:{name:true}}; 
        const select:FindOptionsSelectProperty<Role> = {userRoles:user,RoleName:true};
        const relations:FindOptionsRelations<Role> = {userRoles:{user:true}};
        const data:any = await repo.choiceSelect(select,relations);
        await res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({err:err});
    }
});

// common crud Operation
controllerService(Role, router);
export const roleController = router;
