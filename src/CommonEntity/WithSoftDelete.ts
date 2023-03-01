import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class WithSoftDeleted{
   @PrimaryGeneratedColumn()
   id: number

   @CreateDateColumn()
   createdAt?:Date 

   @UpdateDateColumn()
   updatedAt?: Date

   @DeleteDateColumn()
   deletedAt?: Date
}