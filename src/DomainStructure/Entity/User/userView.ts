import { DataSource, ViewColumn, ViewEntity } from "typeorm";
import { User } from "./User";

@ViewEntity({
    expression:(dataStore:DataSource) => dataStore
    .createQueryBuilder(User,"user")
    .select("user.name","name")
    .addSelect("role.roleName","RoleName")
    .addSelect("user.id","id")
    .leftJoin('user.userRoles',"userRoles")
    .leftJoin('userRoles.role',"role")

})
export class userView {
@ViewColumn()
id:number

@ViewColumn()
name:string

@ViewColumn()
RoleName:string
}