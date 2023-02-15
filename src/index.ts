import { db } from "./Configuration/dbConfig"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

db.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await db.manager.save(user)
    const post = new Post();
    post.post = "new Post";
    await db.manager.save(post);
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await db.manager.find(Post)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
