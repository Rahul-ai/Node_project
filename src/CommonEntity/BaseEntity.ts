import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class BaseClass{
   @PrimaryGeneratedColumn()
   id: number
}