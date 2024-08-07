import { EntityTarget, FindManyOptions, IsNull, Not } from "typeorm";
import { CRequest } from "../Configuration/RequestDataTypes/Request"
import { CResponse } from "../Configuration/RequestDataTypes/Response";
import { db } from "../Configuration/DataBaseConnection/dbConfig";
import { BaseInterface } from "../DomainStructure/CommonEntity/Interfaces/BaseInterface";
import { isSoftDelete } from "../DomainStructure/CommonEntity/Interfaces/IsSoftDelete";
import { SecurityLog } from "../DomainStructure/Entity/SecurityLog/SecurityLog";
import { GLike } from "./QueryBuilder";

export const GenericDomainService = <T>(entity: EntityTarget<T | BaseInterface | isSoftDelete>, securityLog: EntityTarget<SecurityLog> = SecurityLog) => {
   class GRepo {

      public async create(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.create(entity, req.body);
            let ent = `${entity}`.split(" ");
            const log = await db.manager.create(securityLog, { resion: `${ent[1].substring(0, ent[1].length - 2)} create`, data: data })

            await db.manager.save(data);
            await db.manager.save(log);
            res.status(200).json(data);
         }
         catch (e) {
            console.log(e);
            res.status(500).json(e);
         }
      };

      public async restore(req: CRequest, res: CResponse) {
         try {
            await db.manager.restore(entity, req.params.delId)
            res.status(200).json({ msg: 'success' });
         }
         catch (e) {
            console.log(e);
            res.status(500).json(e);
         }
      }

      public async getById(req: CRequest, res: CResponse) {
         try {

            const data = await db.manager.findOneBy(entity, { id: Number(req.params.id) });
            res.status(200).json(data);
         }
         catch (e) {
            console.log(e);
            res.status(500).json(e);
         }
      };

      public async fetchAll(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.find(entity);
            res.status(200).json(data);
         }
         catch (e) {
            console.log(e);
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
            console.log(e);
            res.status(500).json(e);
         }
      };

      public async update(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.update(entity, { id: req.params.id }, req.body);
            let ent = `${entity}`.split(" ");
            const log = await db.manager.create(securityLog, { resion: `${ent[1].substring(0, ent[1].length - 2)} updated`, data: req.body })
            await db.manager.save(log);
            if (data.affected !== 0) {
               res.status(200).json(req.body);
            }
            else {
               res.status(404).json({ "message": "No data Updated" });
            }
         }
         catch (e) {
            console.log(e)
            res.status(500).json(e);
         }
      };

      public async softDelete(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.softDelete(entity, { id: req.params.id });
            let ent = `${entity}`.split(" ");
            const log = await db.manager.create(securityLog, { resion: `${ent[1].substring(0, ent[1].length - 2)} softDeleted`, data: req.params.id })
            await db.manager.save(log);
            res.status(200).json(data);
         }
         catch (e) {
            console.log(e);
            res.status(500).json(e);
         }
      };

      public async Delete(req: CRequest, res: CResponse) {
         try {
            const data = await db.manager.delete(entity, { id: req.params.id });
            let ent = `${entity}`.split(" ");
            const log = await db.manager.create(securityLog, { resion: `${ent[1].substring(0, ent[1].length - 2)} updated`, data: req.params.id })
            await db.manager.save(log);
            res.status(200).json(data);
         }
         catch (e) {
            console.log(e);
            res.status(500).json(e);
         }
      };

      public async withPagination(req: CRequest, res: CResponse) {
         try {
            if (req?.body.limit == "-1") {
               const condition: FindManyOptions<T | BaseInterface | isSoftDelete> = {
                  where: GLike(req?.body?.where),
                  order: {
                     id: 'DESC'
                  },
               }
               const repo = await db.getRepository(entity).findAndCount(condition);
               res.status(200).json(repo);
            }
            else {
               const condition: FindManyOptions<T | BaseInterface | isSoftDelete> = {
                  where: GLike(req?.body?.where),
                  order: {
                     id: 'DESC'
                  },
                  skip: (req?.body.limit * req?.body.page) - req?.body.limit,
                  take: req?.body.limit,
               }
               const repo = await db.getRepository(entity).findAndCount(condition);
               res.status(200).json(repo);
            }
         }
         catch (e) {
            console.log(e);
            res.status(500).json(e);
         }
      };

      // ---------------------------------------------------------------------------------------------------------------------------
      // not handel Request and Response
      public async choiceSelect( select: {} = null, relations: {} = null,where: {} = null,req: CRequest = null) {
         if (req) {
            return await db.getRepository(entity).findAndCount(this.Inpagination(req, where, select, relations));
         }
        
            return await db.getRepository(entity).find(this.SelectWithOutPagination(where, select, relations));
      };

      public Inpagination(req: CRequest, where: {} = {}, select: {} = {}, relations: {} = {}): {} {
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