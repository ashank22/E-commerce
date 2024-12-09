const { ObjectId } = require('mongodb');
const connectMongo = require('../db/dbConnection');

const categoryCtrl={
    getCategories: async(req,res)=>{
        try{
            const db=await connectMongo();
            const categories=await db.collection("category").find().toArray();
            res.json({categories})

        }catch(err){
            res.json({err:err.message})
        }
    },
    createCategory: async(req,res)=>{
        try{
            const {name}=req.body;
            const db=await connectMongo();
            const category=await db.collection("category").findOne({name});
            console.log(category,name)
            if (category) return res.status(400).json({msg:"category already exists"});
            const result= db.collection("category").insertOne({name});
            res.json({msg:"Admin access",result});
        }catch(err){
            res.json({err:err.message});
        }

    },
    deleteCategory : async(req,res)=>{
        try{
           
            const db = await connectMongo()
            const coll=db.collection("category").deleteOne({_id:ObjectId.createFromHexString(req.params.id)});
            res.json({msg:"delete entry",coll});

        }
        catch(err){

        }
    },
    updateCategory : async(req,res)=>{  
        try{
           
            const db = await connectMongo()
            const coll=db.collection("category").updateOne({_id:ObjectId.createFromHexString(req.params.id)},{$set: {name: req.body.name}});
            res.json({msg:"updated entry",coll});

        }
        catch(err){

        }
    }
}

module.exports=categoryCtrl;