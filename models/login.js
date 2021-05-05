const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/user');
const jwt = require('jsonwebtoken');

// loads the local .env file into process.env
dotenv.config();

// connecting to the mongoDB
const dburi = process.env.dbURI;
const secret = process.env.jwtSecret;


mongoose.connect(dburi,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("connected to the vidly-movie-backend database"))
    .catch((err) => console.log("ERROR\n",err.message));

async function userAuth(email,password){
    const user = await UserModel.findOne({email: email});
    if(!user){
        return "Invalid Email or Password."
    };

    // compare plain-text password with the hashed password.
    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword){
        return "Invalid Email or Password."
    };
    const token = user.generateAuthToken();
    return(
        {token}
    );  
};

module.exports = userAuth;