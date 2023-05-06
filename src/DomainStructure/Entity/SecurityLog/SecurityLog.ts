import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, GeoJSON, ManyToOne, JoinColumn } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { User } from "../User/User"

@Entity()
export class SecurityLog extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    resion: string

    @Column('simple-json',{nullable:true})
    data

    @Column({nullable:true})
    userId:number 

    @ManyToOne(()=>User, user=>user.securityLogs,{nullable:true}) 
    @JoinColumn({name:'userId'})
    user:User
}