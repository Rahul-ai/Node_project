import { EntityTarget} from "typeorm";
import { Request,Response } from "express";
const {db} = require('../Configuration/dbConfig');

export const GenericDomainService = <T>(entity: EntityTarget<T>)=>{
class GRepo
{
   public async fetchAll(req: Request, res: Response) {
      try {
         const data = await db.manager.find(entity);
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async  getById(req: Request, res: Response) {
      try {
         const data = await db.manager.findOneBy(entity, {id : req.params.id});
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async create(req: Request, res: Response) {
      try {
         const data = await db.manager.create(entity, req.body);
         await db.manager.save(data);
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async update(req: Request, res: Response) {
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

   public async Delete(req: Request, res: Response) {
      try {
         const data = await db.manager.update(entity,{id: req.params.id}, req.body);
         res.status(200).json(data);
      }
      catch (e) {
         res.status(500).json(e);
      }
   }

   public async withPagination(req: Request, res: Response) {
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
         console.log(await db.manager.softDelete(entity,{id: req.params.id}));
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