import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { PageInfo } from "../PageInfo/pageInfo"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

@Entity()
export class project extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    projectName: string

    @Column()
    description: string
    
    @OneToMany(()=>PageInfo, pageInfo=>pageInfo.project,{nullable:true}) 
    page:PageInfo[]

}