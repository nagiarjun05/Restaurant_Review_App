const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Restaurant=sequelize.define('Restaurant',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type:Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  address:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  details:{
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports=Restaurant;