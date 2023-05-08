import { DataSource, ViewColumn, ViewEntity } from "typeorm";
import { SecurityLog } from "./SecurityLog";

@ViewEntity({expression:(datastore:DataSource)=> datastore
    .createQueryBuilder(SecurityLog,"securityLog")
    .select("user.id","Userid")
    .addSelect("user.name","UserName")
    .addSelect("securityLog.data","data")
    .addSelect("securityLog.resion","resion")
    .addSelect("securityLog.id","id")
    .leftJoin("securityLog.user","user")
})
export class SecurityLogView{
@ViewColumn()
id:number

@ViewColumn()
UserId:number

@ViewColumn()
UserName:string

@ViewColumn()
data:JSON

@ViewColumn()
resion:string
}