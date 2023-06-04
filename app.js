const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
dotenv.config();

app.use(cors());

app.use(bodyParser.json());

app.listen(8000,()=>{
    console.log(`Server for ${process.env.PROJECT_NAME}`)
});