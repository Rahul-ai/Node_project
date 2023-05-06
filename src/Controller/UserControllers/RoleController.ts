import express from "express";
import { CRequest } from "../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../Configuration/RequestDataTypes/Response";
import { controllerService } from "../../CommonController/CommonControllerService";
import { GenericDomainService } from "../../GenericRepo/GRepo";
import { Role } from "../../DomainStructure/Entity/User/Role";
import { roleDTO } from "../../DomainStructure/DTOs/User/roleDTO";
import { userDTO } from "../../DomainStructure/DTOs/User/userDTO";
import { Like } from "typeorm";
import { User } from "../../DomainStructure/Entity/User/User";

const router = express.Router();
const repo = GenericDomainService(Role);

// coustomGet Eample:
router.get("/coustomGet", async (req: CRequest, res: CResponse) => {
    try {
        const user:Partial<userDTO> = {firstName:true,id:true} 
        const select:Partial<roleDTO> = {users:user};
     
        const relations:any = ["users"];
        
        const data:any = await repo.choiceSelect(null,select,relations);
        await res.status(200).json([data]);
    } catch (err) {
        res.status(500).json({err:"someThing wrong"});
    }
});

const querybuilder = (data) =>{
    let a = Object.keys(data).map((key)=>{
        data[key] = Like(`%${data[key]}%`)
    });
    // console.log(a);
    return data;
}

// common crud Operation
controllerService(Role, router);
module.exports = router;
