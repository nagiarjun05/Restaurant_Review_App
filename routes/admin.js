const router=require('express').Router();

const adminControllers=require('../controllers/admin');
const adminAuthentication=require('../middleware/authentication')

router.post('/signup',adminControllers.signup);
router.post('/login',adminControllers.login);
router.get('/restaurants',adminAuthentication.authentication,adminControllers.getRestaurants)
router.post('/restaurants/restaurant',adminAuthentication.authentication,adminControllers.postRestaurant)

module.exports=router;
