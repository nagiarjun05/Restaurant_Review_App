const express=require('express');
const router=express.Router();

const restaurantControllers=require('../controllers/restaurant');


router.get('/restaurants',restaurantControllers.getRestaurants);
router.get('/restaurant',restaurantControllers.getRestaurantDetails);


module.exports=router;