import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import people from "./db.js";

const app = express();
const port = 4000 ;

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})