import { JsonWebKey, JwkKeyExportOptions } from "crypto";
import { Request, Response } from "express";
const config = require("../../Configuration/dbConfig");

const jwt = require("jsonwebtoken");

export const auth = (req, res, next) => {
    if (req.headers["authorization"]) {
        try {
            const token = req.headers["authorization"].split(" ");
            const verifiedPayload = jwt.verify(token[1], "mySecret");
            // can add id user is exist;
            req.user = verifiedPayload;
            next();
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(404).json({ message: "Token not found" });
    }
};
