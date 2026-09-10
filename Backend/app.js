require("dotenv").config();
const express=require("express");
const app=express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors=require("cors");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const mongoose=require("mongoose");
async function main(){
    await mongoose.connect(process.env.MONGO_URI);
}
main()
    .then(()=>{
        console.log("MongoDB Connected");
        app.listen(port,()=>{
            console.log(`Server Running on http://localhost:${port}`);

        })
    })
    .catch(error=>console.log(error));
//Main Route
app.get("/", (req, res) => {
    
});