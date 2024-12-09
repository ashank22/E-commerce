const express=require('express');
const router=express.Router();
const {login,register,refreshtoken,logout,getUser}=require('../controllers/userCtrl');
const auth = require('../middleware/auth');


router.post('/login',login);
router.post('/register',register);
router.post('/refreshtoken',refreshtoken);
router.get('/logout',logout)
router.get('/info',auth,getUser)
router.get('/',(req,res)=>{
    console.log("route")
    res.send('hello')
});
module.exports=router;