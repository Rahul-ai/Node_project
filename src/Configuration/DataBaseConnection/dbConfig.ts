import "reflect-metadata";
import { DataSource } from "typeorm";

 let options = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Password@123",
    database: "test",
    synchronize: true,
    logging: false, 
    entities: ["src/DomainStructure/Entity/**/*.{js,ts}"],
    subscribers: [],
    migrations: [],
});

options.initialize();
export const db = options;

