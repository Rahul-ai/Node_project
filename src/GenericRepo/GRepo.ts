import { EntityTarget, FindManyOptions, IsNull, Not } from "typeorm";
import { CRequest } from "../Configuration/RequestDataTypes/Request"
import { CResponse } from "../Configuration/RequestDataTypes/Response";
import { db } from "../Configuration/Connection/dbConfig";
import { BaseInterface } from "../Structure/CommonEntity/Interfaces/BaseInterface";
import { isSoftDelete } from "../Structure/CommonEntity/Interfaces/IsSoftDelete";

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
            
            const data = await db.manager.findOneBy(entity, { id: Number(req.params.id) });
            console.log(data)
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
         try {
            const where = { deletedAt: Not(IsNull()) };
            const options: FindManyOptions<T | BaseInterface | isSoftDelete> = {
               withDeleted: true, // force load relations include soft-deleted
               where,
               order: {
                  id: 'DESC'
               },  
               skip: (req?.body.limit * req?.body.page) - req?.body.limit,
               take: req?.body.limit,
            };

            const data = await db.manager.findAndCount(entity, options);
            res.status(200).json(data);
         }
         catch (e) {
            res.status(500).json(e);
         }
      };

      public async update(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.update(entity, { id: req.params.id }, req.body);
             
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
            const condition:FindManyOptions<T | BaseInterface | isSoftDelete>  = {
               order: {
                  id: 'DESC'
               },  
               skip: (req?.body.limit * req?.body.page) - req?.body.limit,
               take: req?.body.limit,
            }
            const repo = await db.getRepository(entity).findAndCount(condition);
            res.status(200).json(repo);
         }
         catch (e) {
            console.log(e);
            res.status(500).json(e);
         }
      };

// ---------------------------------------------------------------------------------------------------------------------------
      // not handel Request and Response
      public async choiceSelect(req: CRequest = null, where: {} = null, select: {} = null, relations: {} = null ) {
         if (req) {
            return await db.getRepository(entity).findAndCount(this.Inpagination(req, where, select, relations));
         }
         return await db.getRepository(entity).findAndCount(this.SelectWithOutPagination(where, select, relations));
      };

      public Inpagination(req: CRequest, where: {} = {}, select: {} = {}, relations: {} = {}):{} {
         const condition = {
            where,
            relations,
            select,
            order: {
               id: 'DESC'
            },
            skip: (req?.body.limit * req?.body.page) - req?.body.limit,
            take: req?.body.limit,
         }
         return condition;
      }

      private SelectWithOutPagination(where: {}, select: {}, relations: {}) {
         return {
            where,
            relations,
            select,
         }
      };
   }
   return new GRepo();
}