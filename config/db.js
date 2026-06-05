//databse connection 
//if error are in database then we can come here and check fir the error


const mongoose=require('mongoose');
const dotenv=require('dotenv').config();

async function connection()
{
    try
    {
        await mongoose.connect(process.env.MONGODBURL)//throuht moongoose we have our connection string
        console.log("database is connected");
    }
    catch(error)
    {
        if(error) throw error;
    }
}

module.exports=connection;//we pass the function conection when needed for this this line is rsponsible

