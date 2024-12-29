const mongoose=require("mongoose");
const Comment=require("./Comment");
const Authentication=require("./../middle/Auntentication");
const express=require("express");
const Post=require("./post");
const router=express.Router();

router.get("/:id",async(req,res)=>{
    const postId=req.params.id;
    console.log(postId)
    try{
        const comments=await Comment.find({post:postId}).populate("user","username").sort({createdAt:-1});
        console.log(comments);
        return res.status(200).json(comments);
    }
    catch(error){
        return res.status(440).json(error);
    }
})
router.post("/",Authentication,async(req,res)=>{
    const{content,post}=req.body;
    console.log(content,post);
    const user=req.user;
    try{
        const exitComment=new Comment({content,post,user:user._id});
        await exitComment.save();
        console.log(exitComment);
        await Post.findByIdAndUpdate(post,{$inc:{commentCount:1}});
        return res.status(200).json({exitComment});
    }
    catch(error){
        return res.status(504).json({error});
    }
})

module.exports=router;