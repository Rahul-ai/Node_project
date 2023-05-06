import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, TableForeignKey ,JoinTable, JoinColumn, ManyToMany } from "typeorm"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { User } from "./User"

@Entity()
export class Role extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    RoleName: string

    
    @OneToMany(()=>User, users=>users.roles)
    users:User[] 
}