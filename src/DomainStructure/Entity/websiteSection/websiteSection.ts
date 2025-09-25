import { Entity, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { PageInfo } from "../PageInfo/pageInfo"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

@Entity()
export class websiteSection extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    sectionName: string

    @Column()
    type: string

    @Column()
    width: string
    
    @Column()
    height: string
   
    @Column()
    xAsis: string

    @Column()
    yAxis: string

    @Column()
    backgroundColor: string

    @Column()
    backgroundImage: string

    @ManyToOne(()=>PageInfo, pageInfo=>pageInfo.websiteSections)
    @JoinColumn({name:'pageInfoId'})
    PageInfo:PageInfo

}