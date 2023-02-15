import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

 let options = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Password@123",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [User, Post],
    subscribers: [],
    migrations: [],
});

options.initialize();
export const db = options;

