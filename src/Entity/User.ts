import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseClass } from "../CommonEntity/BaseEntity"
import { BaseInterface } from "../EntityInterfaces/BaseInterface"

@Entity()
export class User extends BaseClass implements BaseInterface{

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
