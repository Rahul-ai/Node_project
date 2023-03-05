import { JsonWebKey, JwkKeyExportOptions } from "crypto";
import { NextFunction } from "express";
import { config } from "../../Config/Config";
import { CRequest } from "../../RequestDataTypes/Request";
import { CResponse } from "../../RequestDataTypes/Response";
// const config = require("../../Configuration/dbConfig");

const jwt = require("jsonwebtoken");

export const auth = (req:CRequest, res:CResponse, next:NextFunction) => {
    if (req.headers["authorization"]) {
        try {
            const token = req.headers["authorization"].split(" ");
            const verifiedPayload = jwt.verify(token[1],config.secretKey);
            // can add id user is exist;
            req.user = verifiedPayload;
            console.log(verifiedPayload);
            next();
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(404).json({ message: "Token not found" });
    }
};
