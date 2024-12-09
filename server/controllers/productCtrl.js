const { ObjectId } = require('mongodb');
const connectMongo=require('../db/dbConnection')
class APIfeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString = queryString
    }

    filtering(){
        const queryObj= {...this.queryString}
        console.log(queryObj)
        const excludedFields = ['page','sort','limit']
        excludedFields.forEach(el=> delete(queryObj[el]))
    }
    sorting(){

    }
    pagination(){

    }
}
const productCtrl={
    getProducts : async(req,res)=>{
        try {
            const db= await connectMongo();
            const coll= await db.collection("products");
            const features= new APIfeatures(coll.find(), req.query).filtering();
            const products = await features.query;
            res.json(products);
        } catch (error) {
            res.json({msg:"cannot get products"})
        }
    },
    createProducts : async(req,res)=>{
        try {
            const db= await connectMongo();
            const results= await db.collection("products").insertOne(req.body);
            res.json({msg:"inserted"});
        } catch (error) {
            res.json({msg:"cannot create products"})
        }
    },
    deleteProducts : async(req,res)=>{
        try {
            const db= await connectMongo();
            const results= await db.collection("products").deleteOne({_id:ObjectId.createFromHexString(req.params.id)});
            res.json(results);
        } catch (error) {
            res.json({msg:"cannot delete products",error})
        }
    },
    updateProducts : async(req,res)=>{
        try {
            const db= await connectMongo();
            const results= await db.collection("products").updateOne({_id:ObjectId.createFromHexString(req.params.id)},{$set: {name:req.body.name}});
            res.json(results);
        } catch (error) {
            res.json({msg:"cannot delete products"})
        }
    },
}

module.exports=productCtrl;