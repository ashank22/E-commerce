const express=require("express");
const router=express.Router();

const authAdmin = require("../middleware/authAdmin");
const {getProducts, createProducts, deleteProducts, updateProducts}=require('../controllers/productCtrl');
const auth = require("../middleware/auth");
router.route('/products')
.get(getProducts)
.post(auth,authAdmin,createProducts)

router.route('/products/:id')
.delete(auth,authAdmin,deleteProducts)
.put(auth,authAdmin,updateProducts)



module.exports=router;