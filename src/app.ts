import express , { Application, Express, Request, Response } from "express";
const app:Application = express();

// Lib For Log
const morgan = require('morgan');

// cross-origin-request handeler
var cors = require('cors');

//Config file
const config = require('./Configuration/Config');

// Controller
const usercontroller = require('./Controller/UserController');
const PostController = require('./Controller/PostController');

// MiddelWare lib 
app.use(cors());
app.use(morgan('tiny'));

// MiddelWare for file upload
const { upload, multiUpload } = require('./MiddelWare/fileUpload/FileUpload');

// Inbuild MiddelWare
app.use('/Images',express.static('Images'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
 
// Assign Controllers
app.use("/User",usercontroller);
app.use("/Post",PostController);

// Common function
app.post("/upload", upload.single('file'), (req:Request,res:Response) =>{
   console.log(req.file)
    res.json({path:`${config.Api}/${req.file?.path}`});
});

// if request not found
app.all('*',(req:Request,res:Response)=>{
    res.status(404).json({message: 'Resource Not Found'})
});

app.listen(config.port,()=>{
    console.log(`Service on ${config.port}`);
});