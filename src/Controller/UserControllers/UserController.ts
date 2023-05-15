import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../../CommonController/CommonControllerService";
import { User } from "../../DomainStructure/Entity/User/User";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { FindOptionsRelations, FindOptionsSelect } from "typeorm";
import { Role } from "../../DomainStructure/Entity/User/Role";
import { UserRole } from "../../DomainStructure/Entity/User/UserRole";

const router = express.Router();
const repo = GenericDomainService(User);

router.get("/coustomGet", async (req: CRequest, res: CResponse) => {
    try {
        const role:FindOptionsSelect<UserRole> = {role_id:true,role:{RoleName:true}} 
        const select:FindOptionsSelect<User> = {id:true,userRoles:role};
        const relations:FindOptionsRelations<User> = {userRoles:{role:true}};
        const where:any = {id:3};
        const data:any = await repo.choiceSelect(select,relations,where);
        await res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({err:err});
    }
});

// Crud operation
controllerService(User,router);
export const userController = router;