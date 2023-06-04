const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const path=require('path');
const sequelize =require('./util/database')


dotenv.config();


app.use(cors());


app.use(bodyParser.json());


app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `views/${req.url}`))
});


sequelize
.sync()
// .sync({force: true})
.then(()=>{
    app.listen(8000,()=>{
        console.log(`Server for ${process.env.PROJECT_NAME}`)
    });
})
.catch(err=>console.log(err))

