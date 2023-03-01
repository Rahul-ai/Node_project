import { EntityTarget, FindManyOptions, IsNull, Not} from "typeorm";
import { CRequest } from "../CommonInterfaces/Request";
import { CResponse } from "../CommonInterfaces/Response";
import { db } from "../Configuration/dbConfig";
import { BaseInterface } from "../CommonInterfaces/BaseInterface";
import { isSoftDelete } from "../CommonInterfaces/IsSoftDelete";

export const GenericDomainService = <T>(entity: EntityTarget<T | BaseInterface & isSoftDelete>)=>{
class GRepo
{ 
   public async fetchAll(req: CRequest, res: CResponse) {
      try {
         const data = await db.manager.find(entity);
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async getById(req:CRequest, res:CResponse) {
      try {
         console.log(req.user)
         const data = await db.manager.findOneBy(entity, {id : Number(req.params.id)});
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async create(req: CRequest, res: CResponse) {
      try {
         const data = await db.manager.create(entity, req.body);
         await db.manager.save(data);
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async update(req: CRequest, res: CResponse) {
      try {
         const data = await db.manager.update(entity,{id: req.params.id}, req.body);
         //  await db.manager.save(data);
         if(data.affected !== 0){
            res.status(200).json(req.body); 
         }
         else{
            res.status(404).json({"message":"No data Updated"});
         }
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async softDelete(req: CRequest, res: CResponse) {
      try {
         const data = await db.manager.softDelete(entity,{id: req.params.id});
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async Delete(req: CRequest, res: CResponse) {
      try {
         const data = await db.manager.delete(entity,{id: req.params.id});
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async getAllDeleted(req: CRequest, res: CResponse) {
      try {
         const where = {deletedAt:Not(IsNull())}
         const options: FindManyOptions<T | BaseInterface | isSoftDelete> = {
            // withDeleted: true, // force load relations include soft-deleted
            where,
          };
         const repo = await db.getRepository(entity);
         const data = await repo.findAndCount(options);
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async withPagination(req: CRequest, res: CResponse) {
      try {
         const repo = await db.getRepository(entity);
         const data = await repo.findAndCount({
            order:{
               id :'DESC'
            },
            skip: (req.body.limit * req.body.page) - req.body.limit,
            take: req.body.limit,
         });
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   // not handel Request and Response
   public async choiceSelect(where:{},select:{},relations:{}=null){
      return await db.getRepository(entity).find({ where,select,relations });
   }
}
return new GRepo();
}