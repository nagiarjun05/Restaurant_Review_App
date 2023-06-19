const Admin=require('../models/admin');
const Restaurant=require('../models/restaurant');
const Review=require('../models/review');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const sequelize=require('../util/database');
let ITEM_PER_PAGE=4;

var stringValidator=string=>string===undefined||string.length===0?true:false;

var generateTokken=(id,name)=>jwt.sign({adminId: id, name: name}, 'secretToken')

const signup= async (req, res)=>{
    try{
        const {name,email,password}=req.body;

        if (stringValidator(name)||stringValidator(email)||stringValidator(password)) return res.status(401).json({err:"Invalid username or password"})

        const admin= await Admin.findOne({where:{'email':email }})
        
        if(admin) return res.status(403).json({success: false, message: "User admin Already Exist"});

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async(err, hash)=>{
            await Admin.create({
                name: name,
                email: email,
                password: hash
            });
            return res.status(201).json({success: true, message: "Succesfully create new Admin"});
        })
    }catch(err){
        return res.status(500).json(err);
    }
};

const login=async (req, res)=>{
    try{
        const {email, password}=req.body;

        const admin= await Admin.findOne({ where : { 'email':email }})
                
        if(admin){
            bcrypt.compare(password, admin.password, (err, result)=>{
                if(err) throw new Error('Something went wrong')
                else if(result){
                    return res.status(200).json({success: true, message: 'User Logged in Succesfully!', token:(generateTokken(admin.id,admin.name))})
                }
                else return res.status(401).json({success: false, message: 'Please check your username/password!'})
            })
        }else{
            return res.status(404).json({success: false, message: `User Doesn't Exist!`})
        }
    }
    catch(err){
        return res.status(500).json({ message: err })
    }
};

const getRestaurants=async function(req,res){
    try{
        const restReviewDet=await Restaurant.findAll({
                attributes:['id','name',[sequelize.fn('count',sequelize.col('reviews.id')),'reviewCount']],
                include:[
                    {
                        model: Review,
                        attributes:[]
                    }
                ],
                group:['restaurant.id'],
                // order:[['reviewCount', 'desc']]
            });
        if(restReviewDet.length>0) return res.status(201).json({ success: true, restReviewDet: restReviewDet})
        return res.status(404).json({message: "There is not any restaurant in the list!"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ message: "Unable to retrieve Restaurants Details !" })
    }
};


const postRestaurant=async function(req,res){
    try{
        const {restaurantName,restaurantAddress,restaurantDescription}=req.body;
        console.log(req.body)

        if (stringValidator(restaurantName)||stringValidator(restaurantAddress)||stringValidator(restaurantDescription)){
            return res.status(401).json({err:"Invalid details"})}

        const restaurant= await Restaurant.findOne({where:{'name': restaurantName, 'address': restaurantAddress, 'details':restaurantDescription}})
        
        if(restaurant) return res.status(403).json({success: false, message: "Restaurant Already Registered"});

        await Restaurant.create({ name : restaurantName , address : restaurantAddress , details : restaurantDescription });
        return res.status(201).json({success: true, message: "Succesfully Add Restaurant"});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ message: "Something went wrong internally" })
    }
};

module.exports={
    signup, 
    login,
    getRestaurants,
    postRestaurant
};