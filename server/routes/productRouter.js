const express=require("express");
const router=express.Router();

const authAdmin = require("../middleware/authAdmin");
const {getProducts, createProducts, deleteProducts, updateProducts}=require('../controllers/productCtrl')
router.route('/products')
.get(getProducts)
.post(authAdmin,authAdmin,createProducts)

router.route('/products/:id')
.delete(authAdmin,authAdmin,deleteProducts)
.put(authAdmin,authAdmin,updateProducts)



module.exports=router;