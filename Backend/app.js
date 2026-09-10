require("dotenv").config();
const express=require("express");
const app=express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors=require("cors");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
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

const Product=require("./models/product");
//Main Route
app.get("/api/products", async (req, res) => {
    try{
        const allProduct=await Product.find({});
        console.log(allProduct);
        res.status(200).json({
            message:"Data Received to React APP",
            data:allProduct,
        });
    }catch(error){
        res.status(500).json({
            message:"internal Server Error at Sending Product data to React GET/api/products"
        })
    }
});