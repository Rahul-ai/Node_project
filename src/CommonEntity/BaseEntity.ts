import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseClass{
   @PrimaryGeneratedColumn()
   id: number

   @CreateDateColumn()
   createdAt?:Date 

   @UpdateDateColumn()
   updatedAt?: Date

   @DeleteDateColumn()
   deletedAt?: Date
}