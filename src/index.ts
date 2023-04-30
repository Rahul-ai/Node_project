import { db } from "./Configuration/DataBaseConnection/dbConfig"
import { Post } from "./DomainStructure/Entity/Post/Post"
import { Role } from "./DomainStructure/Entity/User/Role"
import { User } from "./DomainStructure/Entity/User/User"

db.initialize().then(async () => {

    const post = new Post();
    post.post="post that do nothing in real world";
    await db.manager.save(post);
    console.log("Inserting a new user into the database...")
    const role = new Role()
    role.RoleName ="Admin";
    await db.manager.save(role);

    const user = new User()
    user.firstName = "Rahul"
    user.lastName = "Thakur"
    user.age = 22
    user.roles = [role];
    await db.manager.save(user);
    console.log("Inserting done")
}).catch(error => console.log(error))
