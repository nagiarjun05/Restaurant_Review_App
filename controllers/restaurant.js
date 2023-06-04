const Restaurant=require('../models/restaurant');


const getRestaurants=async function(req,res){
    try{
        // const page= +req.query.page || 1;
        // const totalCount = await Restaurant.count()
        const Restaurants=await Restaurant.findAll();

        return res.status(201).json({
            success: true, 
            Restaurants: Restaurants,
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Unable to retrieve Restaurants !"
        })
    }
};

module.exports={
    getRestaurants
}