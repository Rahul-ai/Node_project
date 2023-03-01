import { EntityTarget, FindManyOptions, IsNull, Not } from "typeorm";
import { CRequest } from "../../../Configuration/RequestDataTypes/Request";
import { CResponse } from "../../../Configuration/RequestDataTypes/Response";
import { db } from "../../../Configuration/Connection/dbConfig";
import { BaseInterface } from "../../../Structure/CommonEntity/Interfaces/BaseInterface";
import { isSoftDelete } from "../../../Structure/CommonEntity/Interfaces/IsSoftDelete";

export const GenericDomainService = <T>(entity: EntityTarget<T | BaseInterface | isSoftDelete>) => {
   class GRepo {
      public async create(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.create(entity, req.body);
            await db.manager.save(data);
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json(e);
         }
      };
      
      public async getById(req: CRequest, res: CResponse) {
         try {
            console.log(req.user)
            const data = await db.manager.findOneBy(entity, { id: Number(req.params.id) });
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json(e);
         }
      };

      public async fetchAll(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.find(entity);
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json(e);
         }
      };

      public async getAllDeleted(req: CRequest, res: CResponse) {
         console.log("ghjgj");
         try {
            
            const where = { id:1 }; 
            // const options: FindManyOptions<T | BaseInterface | isSoftDelete> = {
            //    withDeleted: true, // force load relations include soft-deleted
            //    where
            // };
            const data = await db.manager.findAndCount(entity,{where});
            // const data = await repo.findAndCount({withDeleted:true});
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json({"ghj":"bmn,"});
         }
      };
    
      public async update(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.update(entity, { id: req.params.id }, req.body);
            //  await db.manager.save(data);
            if (data.affected !== 0) {
               res.status(200).json(req.body);
            }
            else {
               res.status(404).json({ "message": "No data Updated" });
            }
         }
         catch (e) {
            res.status(500).json(e);
         }
      };

      public async softDelete(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.softDelete(entity, { id: req.params.id });
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json(e);
         }
      };

      public async Delete(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.delete(entity, { id: req.params.id });
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json(e);
         }
      };

      public async withPagination(req: CRequest, res: CResponse) {
         try {
            const repo = await db.getRepository(entity);
            const data = await repo.findAndCount(this.pagination(req));
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json(e);
         }
      };

      // not handel Request and Response
      public async choiceSelect(where: {} = null, select: {} = null, relations: {} = null, req: CRequest = null) {
         if (req) {
            return await db.getRepository(entity).findAndCount(this.pagination(req, where, select, relations));
         }
         return await db.getRepository(entity).findAndCount(this.SelectWithOutPagination(where, select, relations));
      };


      private pagination(req: CRequest = null, where: {} = null, select: {} = null, relations: {} = null): {} {
         return {
            where,
            relations,
            select,
            order: {
               id: 'DESC'
            },

            skip: (req?.body?.limit * req?.body?.page) - req?.body?.limit,
            take: req?.body?.limit,
         };
      };

      private SelectWithOutPagination(where: {} = null, select: {} = null, relations: {} = null) {
         return {
            where,
            relations,
            select,
         };
      };
   }
   return new GRepo();
}