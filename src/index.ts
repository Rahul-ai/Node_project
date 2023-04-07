import { db } from "./Configuration/DataBaseConnection/dbConfig"
import { Post } from "./Structure/Entity/Post/Post"
import { Role } from "./Structure/Entity/User/Role"
import { User } from "./Structure/Entity/User/User"

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
    user.role = Promise.resolve(role);
    
    await db.manager.save(user);

    console.log("Inserting done")
//     const user1 = new User()
//     user1.firstName = "Rahul"
//     user1.lastName = ""
//     user1.age = 22
//     user1.role = role;
//     await db.manager.save(user1);
// //  await db.manager.delete(Role,{id:1});
//     // const post = new Post();
//     // post.post = "new Post";
//     // await db.manager.save(post);
//     console.log("Saved a new user with id: " + user.id)
//     console.log("Loading users from the database...")
   
//     const users = await db.manager.find(User);
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
