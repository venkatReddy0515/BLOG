const jwt=require("jsonwebtoken");
const generateJwt=(userId)=>{
    const token=jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
}
module.exports=generateJwt;