const Like=require("./Like");
const Post=require("./post");
console.log(Post)
const Authentication=require("./../middle/Auntentication");
const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
router.post("/like",Authentication,async(req,res)=>{
    console.log(Like);
    const {post}=req.body;
    const user=req.user;
    try{
        const exist=await Like.findOne({post,user:user._id});
        if(!exist){
            const newLike=new Like({user,post})
            await newLike.save();
            await Post.findByIdAndUpdate(post,{$inc:{likeCount:1}});
            return res.status(200).json({message:"Liked successfully"})
        }
            await Like.findOneAndDelete({user,post});
            await Post.findByIdAndUpdate(post,{$inc:{likeCount:-1}});
            res.status(200).json({ message: "Post unliked successfully" });

    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
router.get("/",async(req,res)=>{
    try{
        const likes=await Like.find().populate("user","username");
        return res.status(200).json(likes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

    
})
module.exports=router;