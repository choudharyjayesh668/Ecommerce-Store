const JWT=require("jsonwebtoken");

const IsLoggedIn=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Only Authorized User Can Access",
        });
    };
    try{
        const checker=JWT.verify(token,process.env.JWT_SECRET);
        req.userId=checker.userId;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Only Authorized User Can Access",
        });
    };
};
module.exports=IsLoggedIn;