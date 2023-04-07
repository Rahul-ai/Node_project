import { Entity, Column, BaseEntity } from "typeorm"
import { WithSoftDeleted } from "../../CommonEntity/WithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"

@Entity()
export class Post extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    post: string

}