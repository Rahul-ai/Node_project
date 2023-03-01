import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { BaseInterface } from "../../CommonInterfaces/BaseInterface"
import { Role } from "./Role"

@Entity()
export class User extends BaseClass implements BaseInterface{

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @ManyToOne(()=>Role, role=>role.user, {onDelete:"SET NULL"} )
    role:Role
}
