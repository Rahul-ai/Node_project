import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { WithSoftDeleted } from "../../CommonEntity/WithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { User } from "./User"

@Entity()
export class Role extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    RoleName: string
    
    @OneToMany(()=>User, users=>users.role)
    users:User[]
}