const User=require("./../back/model");
const checkMail= async (req,res,next) =>{
    const {email}=req.body;
    try{
        const exist=await User.findOne({email});
        if(exist){
            return res.status(400).json({message:"Sorry Email already exist"});

        }
        next();

    }
    catch (error) {
        console.error("Error checking email:", error.message);
        res.status(500).send("Internal server error.");
    }
};

    
module.exports=checkMail;
