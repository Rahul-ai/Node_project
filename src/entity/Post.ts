import { Entity, Column, BaseEntity } from "typeorm"
import { BaseClass } from "../CommonEntity/BaseEntity"
import { BaseInterface } from "../EntityInterfaces/BaseInterface"

@Entity()
export class Post extends BaseClass implements BaseInterface{

    @Column()
    post: string

}