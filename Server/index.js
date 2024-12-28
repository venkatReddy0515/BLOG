const express=require("express");
const mongoose=require("mongoose");
const dataBase=require("./back/conn")
const bodyParser = require("body-parser");
const cors=require("cors");
const multer=require("multer");
const router=require("./back/routes")
const postRouter=require("./back/postRoutes");
const app=express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port=process.env.PORT||4000;

app.get("/",(req,res)=>{
    res.send("helo");
})

app.use("/blog",router);
app.use("/post",postRouter);
app.listen(port,()=>{
    console.log(`server is running on https:localhost:${port}`)
})

