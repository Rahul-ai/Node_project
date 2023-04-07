import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, GeoJSON, ManyToOne } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { WithSoftDeleted } from "../../CommonEntity/WithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { User } from "../User/User"

@Entity()
export class SecurityLog extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    resion: string

    @Column('simple-json',{nullable:true})
    data
    
    @ManyToOne(()=>User, users=>users.id,{nullable:true})
    users:Promise<User[]>
}