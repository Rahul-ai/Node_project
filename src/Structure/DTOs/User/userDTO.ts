import { BaseInterface } from "../../../CommonEntity/Interfaces/BaseInterface"
import { roleDTO } from "./roleDTO"

export interface userDTO extends BaseInterface {
    firstName: boolean & any
    lastName: boolean & any
    age: boolean & any
    role:Partial<roleDTO>
}
