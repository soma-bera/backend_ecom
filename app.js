

//--------------------------------------------------------------------------------------------//
// app.listen(port,()=>
// {
//     console.log("the server is running on "+port);
//     connection();
// });

// const mongoose = require("mongoose");




//connecting the server to the database
//folder to handle the database --config
//we will import the connection of the database 
// let connection=require('./config/db');
//connection()--to calll the connection


const express = require('express');
const app = express();
require('dotenv').config();

const cors=require('cors')
let connection=require('./config/db')
const limiter=require('./middleware/ratelimit')
let productroutes=require('./routes/productroutes')
//const { router: productroutes } = require('./routes/productroutes');
let authroutes=require('./routes/authroutes')
//const app=express();
const port = process.env.PORT || 3000;


//middleware

app.use(express.json())
app.use(cors())
app.use(limiter)
app.use('/products',productroutes)
app.use('/auth',authroutes)



app.listen(port,()=>{
  console.log(`the server is running on ${port} `)
  connection();
  
})