const express=require('express');
const router=express.Router();

const reviewControllers=require('../controllers/review');


router.post('/post-review',reviewControllers.postReview);

module.exports=router;