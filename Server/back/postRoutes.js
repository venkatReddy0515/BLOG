const express=require("express");
const Post=require("./post");
const authorization=require("./../middle/Auntentication");

const router=express.Router();

const multer=require("multer");

const posts=multer.memoryStorage();
const upload=multer({posts});

router.get("/",async(req,res)=>{
    const {limit,currentPage}=req.query;
    console.log(limit,currentPage);
    const skip=(currentPage-1)*limit;
    try{
        const posts = await Post.find()
        .populate("author", "username")
        .skip(skip)
        .limit(parseInt(limit))
        .exec();
        const count=await Post.countDocuments();
        console.log(posts)
        return res.status(200).json({posts,count,currentPage:parseInt(currentPage)})
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching posts", details: error.message });
    }
});
router.post("/", authorization, upload.single("image"), async (req, res) => {
    const { tittle, content } = req.body;
    const createdAt = new Date();  // Use current date as creation date


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