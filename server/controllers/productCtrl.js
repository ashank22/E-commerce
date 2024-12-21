const { ObjectId } = require('mongodb');
const connectMongo=require('../db/dbConnection')
class APIfeatures{
    constructor(collection,queryString){
        this.collection=collection;
        this.query = {};
        this.queryString= queryString;
        this.pagi=null;
    }

     filtering(){
        const queryObj= {...this.queryString}
        const excludedFields = ['page','sort','limit']
        excludedFields.forEach(el=> delete(queryObj[el]))

        let queryStr=JSON.stringify(queryObj);
        queryStr= queryStr.replace(/\b(gte|gt|lt|lte|regex|options)\b/g,match=>'$'+match)

    
        this.query=(JSON.parse(queryStr));
        console.log(queryStr);
    
        return this;

    }
    sorting(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' '); // e.g., "price,-createdAt"
            this.sort = sortBy; // Store sort criteria for MongoDB
        } else {
            this.sort = 'createdAt'; // Default sort
        }
        return this;
    }
    pagination(){
        const page = this.queryString.page * 1 || 1;

        const limit =  this.queryString.limit * 1 || 19;

        const skip = (page-1) * limit;

        this.pagi={skip,limit};

        return this;
    }
    async execute(){
        let result=this.collection.find(this.query);
        
        if (this.sort) {
            const sortCriteria = {};
            this.sort.split(' ').forEach(field => {
                const order = field.startsWith('-') ? -1 : 1;
                sortCriteria[field.replace('-', '')] = order;
            });
            result = result.sort(sortCriteria);
        }

        if (this.pagi) {
            result = result.skip(this.pagi.skip).limit(this.pagi.limit);
        }

        return result.toArray();
    }
}
const productCtrl={
    getProducts : async(req,res)=>{
        try {
            const db= await connectMongo();
            const coll= await db.collection("products");
            const features= new APIfeatures(coll, req.query).filtering().pagination();  //becaseu there are some query parts which are not meant to be send we need to remove them
            const products = await features.execute();
            res.json(products);

        } catch (error) {
            res.json({'error':404,msg:error})
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
            console.log(req.body)
            const results= await db.collection("products").updateOne({_id:ObjectId.createFromHexString(req.params.id)},{$set: {img:req.body.img,name:req.body.name,price:req.body.price}});
            res.json(results);
        } catch (error) {
            res.json({msg:"cannot delete products"})
        }
    },
}

module.exports=productCtrl;