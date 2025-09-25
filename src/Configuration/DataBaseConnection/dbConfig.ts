import "reflect-metadata";
import { DataSource } from "typeorm";
import { Role } from "../../DomainStructure/Entity/User/Role";
import { User } from "../../DomainStructure/Entity/User/User";
import { UserRole } from "../../DomainStructure/Entity/User/UserRole";
import { SecurityLog } from "../../DomainStructure/Entity/SecurityLog/SecurityLog";
import { SecurityLogView } from "../../DomainStructure/Entity/TableViews/SecurityLogView";
import { project } from "../../DomainStructure/Entity/Project/project";
import { PageInfo } from "../../DomainStructure/Entity/PageInfo/pageInfo";
import { websiteSection } from "../../DomainStructure/Entity/websiteSection/websiteSection";

let EntityList = [project,PageInfo,websiteSection,Role,User,UserRole,SecurityLog,SecurityLogView];

 let options = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "test",
    synchronize: true,
    logging: true, 
    entities: EntityList,
    subscribers: [],
    migrations: [],
});

options.initialize() .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });;
export const db = options;

