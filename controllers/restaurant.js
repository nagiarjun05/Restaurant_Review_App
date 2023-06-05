const Restaurant=require('../models/restaurant');
const Review=require('../models/review');

let ITEM_PER_PAGE=2;

const getRestaurants=async function(req,res){
    try{
        const page= +req.query.page || 1;
        const totalCount = await Restaurant.count()
        const restaurants=await Restaurant.findAll({
            offset: (page-1)*ITEM_PER_PAGE,
            limit:ITEM_PER_PAGE
        });

        if(restaurants.length>0){
            return res.status(201).json({
                success: true, 
                restaurants: restaurants,
                currentPage:page,
                hasNextPage:ITEM_PER_PAGE*page<totalCount,
                nextPage:page+1,
                hasPreviousPage:page>1,
                previousPage:page-1,
                lastPage:Math.ceil(totalCount/ITEM_PER_PAGE)
            })
        }
        return res.status(404).json({message: "There is not any restaurant in the list!"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Unable to retrieve Restaurants !"
        })
    }
};


const getRestaurantDetails=async function(req,res){
    try{
        const restaurantId=req.query.restaurantId

        const restaurant=await Restaurant.findByPk(restaurantId);

        const page= +req.query.page || 1;
        const totalCount = await Review.count({where:{RestaurantId:restaurantId}})
        const Reviews=await Review.findAll({
            where:{RestaurantId:restaurantId},
            offset: (page-1)*ITEM_PER_PAGE,
            limit:ITEM_PER_PAGE
            })
        return res.status(201).json({
                success: true,
                restaurant: restaurant,
                reviews:Reviews,
                currentPage:page,
                hasNextPage:ITEM_PER_PAGE*page<totalCount,
                nextPage:page+1,
                hasPreviousPage:page>1,
                previousPage:page-1,
                lastPage:Math.ceil(totalCount/ITEM_PER_PAGE)
            })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Unable to retrieve Restaurant details !"
        })
    }
};

module.exports={
    getRestaurants,
    getRestaurantDetails
}