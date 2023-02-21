import { Router } from "express";
import { EntityTarget } from "typeorm";
import { GenericDomainService } from "../GenericRepo/GRepo";

export const controllerService= <T>(entity:EntityTarget<T>,router:Router)=>{
    const repo = GenericDomainService(entity);

    router.get("/:id", repo.getById);
    router.delete("/:id", repo.Delete);
    router.get("/", repo.fetchAll);
    router.post("/", repo.create);
    router.put("/:id", repo.update);   
    router.get("/getAllDelete", repo.getAllDeleted); 
    router.post("/withPagination",repo.withPagination);

    return router;
}
