import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { Role } from "./Role"

@Entity()
export class User extends BaseClass implements BaseInterface{

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @ManyToOne(()=>Role, role=>role.users, {onDelete:"SET NULL"} )
    @JoinColumn()
    role:Promise<Role>
}
