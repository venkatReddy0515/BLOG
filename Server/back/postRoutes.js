const express=require("express");
const Post=require("./post");
const authorization=require("./../middle/Auntentication");

const router=express.Router();

const multer=require("multer");

const posts=multer.memoryStorage();
const upload=multer({posts});

router.get("/",async(req,res)=>{
    try{
        const post=await Post.find().populate("author","username").exec();
        return res.status(200).json(post)
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching posts", details: error.message });
    }
});
router.post("/", authorization, upload.single("image"), async (req, res) => {
    const { tittle, content } = req.body;
    const createdAt = new Date();  // Use current date as creation date

    // Check if the file exists and convert it to base64
    let imageBase64 = null;
    if (req.file) {
        imageBase64 = req.file.buffer.toString("base64");
        console.log(imageBase64);
    }

    try{
        
        const newPost = new Post({
            tittle:tittle,
            content,
            photo:imageBase64,
            createdAt,
            author: req.user._id,
        });

        console.log(newPost);

        
        await  newPost.save();

        res.status(201).json({ message: "Post created successfully" });
    }catch (error) {
        res.status(500).json({ error: "Error creating post", details: error.message });
    }
});
    
module.exports=router;