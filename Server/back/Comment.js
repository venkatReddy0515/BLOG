const mongoose=require("mongoose");
const Comment=new mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
module.exports=mongoose.model("Comment",Comment);