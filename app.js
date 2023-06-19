const express=require('express');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv')

dotenv.config()

const sequelize =require('./util/database')

const Restaurant=require('./models/restaurant')
const Review=require('./models/review')
const bodyParser=require('body-parser');

app.use(cors());

const path=require('path');
const restaurantRoutes=require('./routes/restaurant');
const reviewRoutes=require('./routes/review');
const adminRoutes=require('./routes/admin');

app.use(bodyParser.json());

app.use('/review',reviewRoutes);
app.use('/admin',adminRoutes);
app.use(restaurantRoutes);

app.use((req,res)=>res.sendFile(path.join(__dirname, `views/${req.url}`)));

//Association between tables
Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);


sequelize
.sync()
// .sync({force: true})
.then(()=>app.listen(8000,()=>console.log(`Server is running`)))
.catch(err=>console.log(err))