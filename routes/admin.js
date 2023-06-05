const express=require('express');
const router=express.Router();

const adminControllers=require('../controllers/admin');
const adminAuthentication=require('../middleware/authentication')

router.post('/signup',adminControllers.signup);
router.post('/login',adminControllers.login);
router.get('/restaurants',adminAuthentication.authentication,adminControllers.getRestaurants)

module.exports=router;
