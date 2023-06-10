import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import people from "./db.js";

const app = express();
const port = 4000 ;

app.use(cors());
app.use(bodyParser.json());

app.get("/people", (req, res) => {
  return res.json({ data : people });
});


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})