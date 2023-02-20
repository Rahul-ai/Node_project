import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "../Entity/Post";
import { User } from "../Entity/User";

 let options = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Password@123",
    database: "test",
    synchronize: true,
    logging: false, 
    entities: [User, Post],
    subscribers: [],
    migrations: [],
});

options.initialize();
export const db = options;

