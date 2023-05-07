import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, TableForeignKey ,JoinTable, JoinColumn, ManyToMany } from "typeorm"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { User } from "./User"
import { UserRole } from "./UserRole"

@Entity()
export class Role extends WithSoftDeleted implements BaseInterface,isSoftDelete{

    @Column()
    RoleName: string

    @OneToMany(() => UserRole, userRole => userRole.role, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      @JoinColumn({ referencedColumnName: 'role_id' })
      userRoles!: UserRole[];
}