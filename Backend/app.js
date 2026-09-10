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
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
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
const User = require("./models/user");
const IsLoggedIn = require("./middleware/IsLoggedIn");
//Main Route
app.get("/api/products", async (req, res) => {
    try{
        const allProduct=await Product.find({});
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

app.post("/signup",async(req,res)=>{
    try {
        let { email, password, username } = req.body;
        if (!username || !username.trim()) {
            return res.status(400).json({
                message: "Username is Required",
            });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({
                message: "Email is Required",
            });
        }
        if (!password || !password.trim()) {
            return res.status(400).json({
                message: "Password is Required",
            });
        }
        email = email.trim().toLowerCase();
        username = username.trim();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User Already Exists",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        const token = JWT.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "Account Created Successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
});
app.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        email = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid Email or Password",
            });
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }
        const token = JWT.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "Access Granted",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});