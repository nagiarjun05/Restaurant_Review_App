const jwt=require('jsonwebtoken');
const Admin=require('../models/admin');
const authentication=async (req, res, next)=>{
    try{
        const token=req.headers.authorization;
        const admin=jwt.verify(token, 'secretToken')
        const user=Admin.findByPk(admin.adminId)
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({success: false});
    }
};

module.exports={
    authentication
};