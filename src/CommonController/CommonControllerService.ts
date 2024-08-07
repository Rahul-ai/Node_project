import { Router } from "express";
import { EntityTarget } from "typeorm";
import { GenericDomainService } from "../GenericRepo/GRepo";

export const controllerService= <T>(entity:EntityTarget<T>,router:Router)=>{
    const repo = GenericDomainService(entity);

    //Get Requests
    router.get("/:id", repo.getById);
    router.get("/", repo.fetchAll); 
    
    // Post Requests
    router.post("/onlyDeleted", repo.getAllDeleted); 
    router.post("/withPagination",repo.withPagination);
    router.post("/", repo.create);
    
    //Put Requests
    router.put("/:id", repo.update);  
    
    //Delete Requests
    router.delete("/softDelete/:id", repo.softDelete);
    router.delete("/restore/:delId",repo.restore)
    router.delete("/:id", repo.Delete);

    return router;
}
