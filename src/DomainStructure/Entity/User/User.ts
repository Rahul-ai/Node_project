import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { Role } from "./Role"
import { SecurityLog } from "../SecurityLog/SecurityLog"
import { UserRole } from "./UserRole"

@Entity()
export class User extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column({nullable:false})
    name: string

    @Column({nullable:true})
    email: string 

    @Column({nullable:true})
    age: number 

    @OneToMany(() => UserRole, userRole => userRole.user, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ referencedColumnName: 'user_id' })
    userRoles!: UserRole[];
    
    @OneToMany(()=>SecurityLog, securityLog=>securityLog.user)
    securityLogs:SecurityLog[]
}
