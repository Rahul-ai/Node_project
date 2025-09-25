import { Entity, Column, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { websiteSection } from "../websiteSection/websiteSection"
import { project } from "../Project/project"

@Entity()
export class PageInfo extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    pageName: string

    @Column()
    urlEndPoint: string

    @Column()
    logo: string

    @OneToMany(()=>websiteSection, websiteSection=>websiteSection.PageInfo,{nullable:true})
    websiteSections:websiteSection[]

    @ManyToOne(()=>project, project=>project.page)
    @JoinColumn({name:'projectId'})
    project:project
}