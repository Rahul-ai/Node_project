import { Any } from "typeorm"
import { db } from "./Configuration/DataBaseConnection/dbConfig"
import { Role } from "./DomainStructure/Entity/User/Role"
import { User } from "./DomainStructure/Entity/User/User"

db.initialize().then(async () => {
    
    console.log("Inserting a new user into the database...")
    let role:any = new Role()
    role.RoleName ="Admin";
    await db.manager.save(role);
    role = new Role()
    role.RoleName ="Teacher";
    await db.manager.save(role);
    role = new Role()
    role.RoleName ="student";
    await db.manager.save(role);
    // const postCategories = await db.manager.find(SecurityLogView)
    // console.log(postCategories);
    const user = new User()
    user.name = "Rahul"
    // user.lastName = "Thakur"
    user.age = 22
    // user.roleId = 1;
    await db.manager.save(user); 
    console.log("Inserting done")
}).catch(error => console.log(error))
 