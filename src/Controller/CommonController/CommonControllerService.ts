import { Router } from "express";
import { EntityTarget } from "typeorm";
import { GenericDomainService } from "./GenericRepo/GRepo";

export const controllerService= <T>(entity:EntityTarget<T>,router:Router)=>{
    const repo = GenericDomainService(entity);

    //Get Requests
    router.get("/:id", repo.getById);
    router.get("/", repo.fetchAll); 
    router.get("/getAllDelete", repo.getAllDeleted); 
    
    // Post Requests
    router.post("/", repo.create);
    router.post("/withPagination",repo.withPagination);
    
    //Put Requests
    router.put("/:id", repo.update);  
    
    //Delete Requests
    router.delete("/:id", repo.Delete);
    router.delete("/softDelete/:id", repo.softDelete);

    return router;
}
