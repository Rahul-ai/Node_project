import { EntityTarget} from "typeorm";
import { CRequest } from "../EntityInterfaces/Request";
import { CResponse } from "../EntityInterfaces/Response";
import { db } from "../Configuration/dbConfig";
import { BaseInterface } from "../EntityInterfaces/BaseInterface";

export const GenericDomainService = <T>(entity: EntityTarget<T | BaseInterface>)=>{
class GRepo
{
   private 
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
         // await db.manager.save(data);
         if(data?.affected == 0){
            res.status(404).json({"message":"No data Updated"});
         }
         else{
            res.status(200).json(req.body);
         }
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async Delete(req: CRequest, res: CResponse) {
      try {
         const data = await db.manager.softDelete(entity,{id: req.params.id});
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async AllDeleted(req: CRequest, res: CResponse) {
      try {
         const repo = await db.getRepository(entity);
         const data = await repo.find();
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
         console.log();
         res.status(500).json(e);
      }
   }


   // not handel Request and Response
   public async choiceSelect(where:{},select:{},relations=null){
      return await db.getRepository(entity).find({ where,select,relations });
   }
}
return new GRepo();
}