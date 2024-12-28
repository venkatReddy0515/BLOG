const mongoose=require("mongoose");
const User=require("./model");
const post=new mongoose.Schema({
    tittle:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    photo:{
        type:String,
        require:true
    },
    likeCount:{
        type:Number,
        default:0
    },
    commentCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Post",post);