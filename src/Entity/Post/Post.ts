import { Entity, Column, BaseEntity } from "typeorm"
import { WithSoftDeleted } from "../../CommonEntity/WithSoftDelete"
import { BaseInterface } from "../../CommonInterfaces/BaseInterface"
import { isSoftDelete } from "../../CommonInterfaces/IsSoftDelete"

@Entity()
export class Post extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    post: string

}