import { PrimaryGeneratedColumn,Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { BaseClass } from "../../CommonEntity/BaseEntity"
import { WithSoftDeleted } from "../../CommonEntity/BaseEntityWithSoftDelete"
import { isSoftDelete } from "../../CommonEntity/Interfaces/IsSoftDelete"
import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { Role } from "./Role"
import { SecurityLog } from "../SecurityLog/SecurityLog"
import { User } from "./User"

@Entity('user_roles')
export class UserRole extends WithSoftDeleted {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column()
 user_id!: number;

 @Column()
 role_id!: number;
 
 @ManyToOne(() => User, user => user.userRoles)
 @JoinColumn({ name: 'user_id' })
 user!: User;

 @ManyToOne(() => Role, role => role.userRoles)
 @JoinColumn({ name: 'role_id' })
 role!: Role;
}