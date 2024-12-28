const mongoose=require("mongoose");
const Like=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
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
module.export=mongoose.model("Like",Like);