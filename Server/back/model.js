const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const User=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
})

User.pre("save",async function(next){
    try{
        if(!this.isModified("password"))return next();
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
        next();
    }
    catch(error){
        next(error)
    }
})
module.exports=mongoose.model("User",User)
