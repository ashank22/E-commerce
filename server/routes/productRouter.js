const express=require("express");
const router=express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const {getProducts, createProducts, deleteProducts, updateProducts}=require('../controllers/productCtrl')
router.route('/products')
.get(getProducts)
.post(auth,authAdmin,createProducts)

router.route('/products/:id')
.delete(auth,authAdmin,deleteProducts)
.put(auth,authAdmin,updateProducts)



module.exports=router;