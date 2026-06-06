//------------------------------------------------------------------------------------------------//
//express server--to set up the server (si ple http server)
//let users=require('./models/user_model')
//const jwt=require('jsonwebtoken');
//const bcrypt=require('bcrypt');
//let products=require('./models/product_model');//import tabel or model
//const mail=require('./utils/gmail');


// const express=require('express');
// const cors=require('cors');
// const dotenv=require('dotenv').config();
// let connection=require('./config/db');//import db
// const app=express();//middleware
// const port=process.env.PORT;
// let productroutes=require('./routes/productroutes')
// let authroutes=require('./routes/authroutes')
// const limiter=require('./middleware/rateLimit');


// //cors() is third paty and it is passed as a middleware
// //middleware--request will not go directly to the handler we have middlewares
// //app.use("middleware"));---first it will reach here then it will go to the handler
// //request----server----middleware-----handler
// app.use(cors());
// app.use(limiter);
// app.use(express.json());//to make the objects in the object formate object destructuring

// app.use('/products',productroutes);
// app.use('/auth',authroutes)


// app.listen(port,()=>
// {
//     console.log("the server is running on "+port);
//     connection();
// });

// const mongoose = require("mongoose");




//crud operation
//-------------------------------post inset-------------------------------------------------------//
//client is sending products trigger a function
// app.post('/products',async (req,res)=>
// {
//     try
//     {
//         const { title, price, image } = req.body;
//         //store the details in the table model we will do crud
//         await products.create({title,price,image})//insert the data
//         res.json({"msg":"product saved successfully"})

//     }
//     catch(error)
//     {
//         res.json({"msg":error.message})
//     }
// })

//---------------------------------------get read-------------------------------------------------//
// app.get('/products',async (req,res)=>
// {
//     try
//     {
//         //let maxlimit=req.query.limit
//         let shipment=req.query.location
//         let maxlimit=req.query.limit
//         let allproducts=await products.find().limit(maxlimit)
//         if(shipment!=='india') return res.json({msg:`imported from ${shipment}`})
//         res.json(allproducts);

//     }
//     catch(error)
//     {
//         res.json({"msg":error.message})
//     }
// })
//-------------------------------------update----------------------------------------------------//
//passing  id also with the products 
// app.put('/products/:id',async (req,res)=>
// {
//     try
//     {
//         let product_id=req.params.id;//to capture the id or value 
//         await products.findByIdAndUpdate(product_id,req.body)//(prodct id,objrct to mofify)
//         res.json({"msg":"updated succesfully"})

//     }
//     catch(error)
//     {
//         res.json({"msg":error.message})
//     }
// })

//----------------------------------delete------------------------------------------------------//

// app.delete('/products/:id',async (req,res)=>
// {
//     try
//     {
//         let product_id=req.params.id;//to capture the id or value 
//         await products.findByIdAndDelete(product_id)//(prodct id,objrct to mofify)
//         res.json({"msg":"deleted succesfully"})

//     }
//     catch(error)
//     {
//         res.json({"msg":error.message})
//     }
// })
//---------------------------------------------------------------------------------------------//



//for users

//------------------------------------handling regester----------------------------------------//
//crud
// app.post('/register', async (req, res) => {
//     try {
//         const { username, password, email, role } = req.body;

//         // Check missing fields
//         if (!username || !password || !email || !role) {
//             return res.json({
//                 msg: 'Missing fields'
//             });
//         }

//         // Check if username already exists
//         const check_user = await users.findOne({ username });

//         if (check_user) {
//             return res.json({
//                 msg: 'User already exists'
//             });
//         }

//         // Check if email already exists
//         const check_email = await users.findOne({ email });

//         if (check_email) {
//             return res.json({
//                 msg: 'Email already exists'
//             });
//         }

//         // Hash password
//         const hashed_password = await bcrypt.hash(password, 10);

//         // Create user
        
//  await users.create({
//     username,
//     password: hashed_password,
//     email,
//     role
// });

// //generate a token and send token to client
// let payload={username:username}

// let token=await jwt.sign(payload,secretkey,{expiresIn:'1hr'})

// res.json({
//     msg: 'Registration successful',
//     token
// });

// mail(email,username);


//     } catch (error) {
//         res.json({
//             msg: error.message
//         });
//     }
// });

//registration mail--the message in the email that sucessfully registered



//-------------------------------post inset-------------------------------------------------------//
//to login
// app.post('/login',async (req,res)=>
// {
//     try
//     {
//          const { username,password } = req.body;
//         //store the details in the table model we will do crud
//         // Check missing fields
//         if (!username || !password ) {
//             return res.json({
//                 msg: 'Missing fields'
//             });
//         }
//         //fetch the data from the user table
//         let userdetails=await users.findOne({username})
//         if(!userdetails)
//         {
//             return res.json({"msg":"invalid credential"})
//         }
//         let check_password=await bcrypt.compare(password,userdetails.password)
//         if(!check_password)
//         {
//             return res.json({"msg":"invalid credential"})

//         }
//         //take the token from the header using req.ha headers.key
//         //jwt.verify(token)
//         //if uts not valid token send a message like "invalid token"

//         let currentlocation=req.headers.location
//         res.json({"msg":"login successfull",currentlocation})

//     }
//     //if token will not be send then it can be easily hacked
//     catch(error)
//     {
//         res.json({"msg":error.message})
//     }
// })

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