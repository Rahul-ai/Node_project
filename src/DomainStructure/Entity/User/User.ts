import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { Role } from "./Role"
import { SecurityLog } from "../SecurityLog/SecurityLog"

@Entity()
export class User extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({nullable:true})
    email: string 

    @Column({nullable:true})
    age: number

    @ManyToMany(()=>Role, role=>role.users,{nullable:true})
    @JoinTable()
    roles:Role[]

    @OneToMany(()=>SecurityLog, securityLog=>securityLog.users, {onDelete:"SET NULL",nullable:true} )
    @JoinColumn()
    securityLog:SecurityLog[]
}
