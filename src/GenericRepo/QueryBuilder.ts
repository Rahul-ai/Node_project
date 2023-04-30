import { Like } from "typeorm";

export const GLike = (data) => {
    if (data) {
        Object.keys(data).map((key) => {
            data[key] = Like(`%${data[key]}%`)
        });
        return data;
    }
    else {
        return null;
    }
}