import { EntityTarget } from "typeorm";
import { GenericDomainService } from "../GenericRepo/GRepo";

export const controllerService= <T>(entity:EntityTarget<T>,router)=>{
    const repo = GenericDomainService(entity)
    router.get("/:id", repo.getById);
    router.get("/", repo.fetchAll);
    router.post("/", repo.create);
    router.put("/:id", repo.update);

    return router
}
