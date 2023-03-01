import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { WithSoftDeleted } from "../../CommonEntity/WithSoftDelete"
import { BaseInterface } from "../../CommonInterfaces/BaseInterface"
import { isSoftDelete } from "../../CommonInterfaces/IsSoftDelete"
import { User } from "./User"

@Entity()
export class Role extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    RoleName: string
    
    @OneToMany(()=>User, users=>users.role)
    users:User[]
}