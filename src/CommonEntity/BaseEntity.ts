import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseClass{
   @PrimaryGeneratedColumn()
   id: string

   @CreateDateColumn()
   createdAt?:Date 

   @UpdateDateColumn()
   updatedAt?: Date

   @DeleteDateColumn()
   deletedAt?: Date
}