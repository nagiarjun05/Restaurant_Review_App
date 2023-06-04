const Review=require('../models/review');

const postReview=async function(req,res){
    try{
        const {reviewContent,restaurantId}=req.body;

        await Review.create({review:reviewContent,RestaurantId:restaurantId})
        
        return res.status(201).json({
            success: true,
            message:"Review added succesfully!!"    
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Unable to post your review !"
        })
    }
};

module.exports={
    postReview
}