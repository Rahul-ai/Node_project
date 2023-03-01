import { BaseInterface } from "../../../CommonEntity/Interfaces/BaseInterface"
import { isSoftDelete } from "../../../CommonEntity/Interfaces/IsSoftDelete"
import { userDTO } from "./userDTO"

export interface roleDTO extends BaseInterface,isSoftDelete{
    RoleName?: boolean & any
    users?:Partial<userDTO>
}