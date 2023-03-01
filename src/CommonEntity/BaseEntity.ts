import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseClass{
   @PrimaryGeneratedColumn()
   id: number

   @CreateDateColumn()
   createdAt?:Date 

   @UpdateDateColumn()
   updatedAt?: Date
}