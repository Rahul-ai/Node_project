import express , { Application, Express, Request, Response } from "express";
import multer, { FileFilterCallback } from 'multer';
const uuid = require("uuid").v4;
// const path = require('path');

const storage = multer.diskStorage({
    destination:(req:Request,file, cb) =>{
        cb(null,'Images')
    },
    filename: (req, file, cb) =>{
        const {originalname} = file
        cb(null,`${uuid()}-${originalname}`);
    }
});
const upload = multer({storage:storage});
// const upload = multer({dest: './Images'});
const multiUpload = upload.fields([
    {name:"file1", maxCount:1},
    {name:"file2", maxCount:1},
    {name:"file3", maxCount:1},
    {name:"file4", maxCount:1},
    {name:"file5", maxCount:1},
])

module.exports = {upload, multiUpload};