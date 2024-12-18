const express=require("express");
const router=express.Router();
const {getCategories,createCategory, deleteCategory, updateCategory}=require("../controllers/categoryCtrl");
const authAdmin = require("../middleware/authAdmin");

router.route('/category')
.get(getCategories)
.post(authAdmin,authAdmin,createCategory);

router.route('/category/:id')
.delete(authAdmin,authAdmin,deleteCategory)
.put(authAdmin,authAdmin,updateCategory)
module.exports=router;
