import { BaseInterface } from "../../CommonEntity/Interfaces/BaseInterface"
import { roleDTO } from "./roleDTO"

export interface userDTO extends BaseInterface {
    id:any
    firstName: boolean & any
    lastName: boolean & any
    age: boolean & any
    role:Partial<roleDTO> & any
}
