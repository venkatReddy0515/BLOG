const express=require("express");
const router=express.Router();
const User=require("./model");
const exit=require("./../middle/Login")
const bcrypt=require("bcryptjs");


const generateJwt=require("./../Token/jwtToken");

router.get("/block",(req,res)=>{
    res.send("this is task");
})
router.get("/users",async(req,res)=>{
    try{
        const users=await User.find();
        if(users){
            return res.status(200).json(users);
        }
        return res.status(200).json({message:"No Users are found."})
    }
    catch(error){
        return res.status(404).json({message:"error"})
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"email not found"})
        }
        const checkPassword=await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).json({message:"password not match"})
        }
        const token=generateJwt(user._id);
        return res.status(200).json({ message: "Login successful",token,user});
    }
    catch(error){
        return res.status(400).json({message:"error"})
    }
})
router.post("/sign", exit,async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        const newUser=new User({username,email,password});
        await newUser.save();
        const token=generateJwt(newUser._id);
        return res.status(200).json({message:"sucessfully registered.." ,token,newUser})
    }
    catch(err){
        return res.status(400).json({message:"eeorr"});
    }
})

module.exports=router