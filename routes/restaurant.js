const express=require('express');
const router=express.Router();

const restaurantControllers=require('../controllers/restaurant');


router.get('/restaurants',restaurantControllers.getRestaurants);

module.exports=router;