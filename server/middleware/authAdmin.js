const connectMongo = require('../db/dbConnection');
const {ObjectId}=require('mongodb')
const authAdmin=async(req,res,next)=>{
    try{
        const db=await connectMongo();
            const userId = req.user?.id;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required." });
            }

            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid User ID format." });
            }
            const user=await db.collection("users").findOne({_id:ObjectId.createFromHexString(userId)});
        if(user.role === false) return res.status(400).json({msg:"Admin Resources Access Denied"}) 
        next();
    }catch(error){
        return res.status(500).json({msg:error.message })
    }
}

module.exports = authAdmin;