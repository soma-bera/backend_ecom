//  //let users=require('../models/usermodel')
// const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')
// const mail=require('../utils/gmail')
// const dotenv=require('dotenv').config();

// exports.register=async (req,res)=>{
//   try {
//     const {username,password,email,role}=req.body
//     //1)check the fields
//     if(!username || !password || !email || !role) 
//       return res.json({"msg":"missing fields"})
//    //2)check if user already exits or not
//    let checkuser=await users.findOne({username})
//    if(checkuser) return res.json({msg:"user already exist"})
//    //3)store users data in db
//    let hashedpassword=await bcrypt.hash(password,10)

//   await users.create({username,password:hashedpassword,email,role})
//   //generate a token and send token to client
//   let payload={username:username,email:email}
//   let token=await jwt.sign(payload,process.env.SECRETKEY,{expiresIn:'1hr'})
//   res.json({"msg":"registration succesfull",token})
// mail(email,username);
//   } catch (error) {
//     res.json({"msg":error.message})
//   }
// }

// exports.login=async (req,res)=>{
//  try {
//      const  {username,password}=req.body
//      if(!username || !password) 
//       return res.json({"msg":"missing fields"})
   
//     let userdetails=await users.findOne({username})
//     if(!userdetails) return res.json({"msg":"invalid credentials"})
//      let checkpassword=await bcrypt.compare(password,userdetails.password)
//     if(!checkpassword) return res.json({"msg":"invalid credeentials"})
     
//       //verify the token
//       let token=req.headers.authorization.split(' ')[1]
//       let isverified=await jwt.verify(token,process.env.SECRETKEY)
//        if(!isverified) return res.json({"msg":"invalid token"})
//      res.json({"msg":"login successful"})
//  } catch (error) {
//   res.json({"msg":error.message})
//  }
// }


let users=require('../models/user_model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const mail=require('../utils/gmail')
const dotenv=require('dotenv').config();

exports.register=async (req,res)=>{
  try {
    const {username,password,email,role}=req.body
    //1)check the fields
    if(!username || !password || !email || !role) 
      return res.json({"msg":"missing fields"})
   //2)check if user already exits or not
   let checkuser=await users.findOne({username})
   if(checkuser) return res.json({msg:"user already exist"})
   //3)store users data in db
   let hashedpassword=await bcrypt.hash(password,10)

  await users.create({username,password:hashedpassword,email,role})
  //generate a token and send token to client
  let payload={username:username,email:email}
  let token=await jwt.sign(payload,process.env.SECRETKEY,{expiresIn:'1hr'})
  res.json({"msg":"registration succesfull",token})
mail(email,username);
  } catch (error) {
    res.json({"msg":error.message})
  }
}

exports.login=async (req,res)=>{
 try {
     const  {username,password}=req.body
     if(!username || !password) 
      return res.json({"msg":"missing fields"})
   
    let userdetails=await users.findOne({username})
    if(!userdetails) return res.json({"msg":"invalid credentials"})
     let checkpassword=await bcrypt.compare(password,userdetails.password)
    if(!checkpassword) return res.json({"msg":"invalid credeentials"})
     
      //verify the token
      let token=req.headers.authorization.split(' ')[1]
      let isverified=await jwt.verify(token,process.env.SECRETKEY)
       if(!isverified) return res.json({"msg":"invalid token"})
     res.json({"msg":"login successful"})
 } catch (error) {
  res.json({"msg":error.message})
 }
}