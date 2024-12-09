const express=require("express");
const router=express.Router();
const {getCategories,createCategory, deleteCategory, updateCategory}=require("../controllers/categoryCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route('/category')
.get(getCategories)
.post(auth,authAdmin,createCategory);

router.route('/category/:id')
.delete(auth,authAdmin,deleteCategory)
.put(auth,authAdmin,updateCategory)
module.exports=router;
