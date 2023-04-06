import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { Role } from "./Role"
import { SecurityLog } from "../SecurityLog/SecurityLog"

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

    @OneToMany(()=>SecurityLog, securityLog=>securityLog.users, {onDelete:"SET NULL",nullable:true} )
    @JoinColumn()
    securityLog:Promise<SecurityLog[]>
}
