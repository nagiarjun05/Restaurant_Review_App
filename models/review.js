const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Review=sequelize.define('Review',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  review:{
    type:Sequelize.STRING,
    allowNull: false,
  }
});

module.exports=Review;