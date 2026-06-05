let users=require('../models/user_model')
const bcrypt=require('bcrypt')
const mail=require('../utils/gmail')



exports.register=async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Check missing fields
        if (!username || !password || !email || !role) {
            return res.json({
                msg: 'Missing fields'
            });
        }

        // Check if username already exists
        const check_user = await users.findOne({ username });

        if (check_user) {
            return res.json({
                msg: 'User already exists'
            });
        }

        // Check if email already exists
        const check_email = await users.findOne({ email });

        if (check_email) {
            return res.json({
                msg: 'Email already exists'
            });
        }

        // Hash password
        const hashed_password = await bcrypt.hash(password, 10);

        // Create user
        
 await users.create({
    username,
    password: hashed_password,
    email,
    role
});

//generate a token and send token to client
let payload={username:username}

let token=await jwt.sign(payload,secretkey,{expiresIn:'1hr'})

res.json({
    msg: 'Registration successful',
    token
});

mail(email,username);


    } catch (error) {
        res.json({
            msg: error.message
        });
    }
};

//registration mail--the message in the email that sucessfully registered

exports.login=async (req,res)=>
{
    try
    {
         const { username,password } = req.body;
        //store the details in the table model we will do crud
        // Check missing fields
        if (!username || !password ) {
            return res.json({
                msg: 'Missing fields'
            });
        }
        //fetch the data from the user table
        let userdetails=await users.findOne({username})
        if(!userdetails)
        {
            return res.json({"msg":"invalid credential"})
        }
        let check_password=await bcrypt.compare(password,userdetails.password)
        if(!check_password)
        {
            return res.json({"msg":"invalid credential"})

        }
        //take the token from the header using req.ha headers.key
        //jwt.verify(token)
        //if uts not valid token send a message like "invalid token"

        let currentlocation=req.headers.location
        res.json({"msg":"login successfull",currentlocation})

    }
    //if token will not be send then it can be easily hacked
    catch(error)
    {
        res.json({"msg":error.message})
    }
}

