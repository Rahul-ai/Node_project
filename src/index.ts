import { Any } from "typeorm"
import { db } from "./Configuration/DataBaseConnection/dbConfig"
import { Post } from "./DomainStructure/Entity/Post/Post"
import { Role } from "./DomainStructure/Entity/User/Role"
import { User } from "./DomainStructure/Entity/User/User"
import { userView } from "./DomainStructure/Entity/User/userView"

db.initialize().then(async () => {

    // const post = new Post();
    // post.post="post that do nothing in real world";
    // await db.manager.save(post);
    // console.log("Inserting a new user into the database...")
    // let role:any = new Role()
    // role.RoleName ="Admin";
    // await db.manager.save(role);
    // role = new Role()
    // role.RoleName ="Teacher";
    // await db.manager.save(role);
    // role = new Role()
    // role.RoleName ="student";
    // await db.manager.save(role);
    const postCategories = await db.manager.find(userView)
    console.log(postCategories);
    // const user = new User()
    // user.firstName = "Rahul"
    // user.lastName = "Thakur"
    // user.age = 22
    // user.roleId = 1;
    // await db.manager.save(user); 
    console.log("Inserting done")
}).catch(error => console.log(error))
 