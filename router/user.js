const express = require('express');
const _ = require('lodash');
const Joi = require('joi');
const { addUser,getUser } = require('../models/user');
const authorize = require('../middleware/login');
const userRoute = express.Router();

// Route to register a new user

userRoute.post('/',(req,res) => {
    const { error } = validateUser(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };

    // add a new user to database upon post request
    const user = addUser(req.body.name,req.body.email,req.body.password)
        .then((data) => res.header('x-auth-token',data.token).send(data.response))
        .catch((err) => console.log(err));
});



// Route to get user profile
userRoute.get('/me',authorize, (req,res) => {

    // Return user object from databse
    const user = getUser(req.user._id)
        .then((usr) => res.send(usr))
        .catch((err) => console.log(err));
});



function validateUser(user){
    const schema = {
        name: Joi.string().required().min(4).max(50),
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(8).max(255)
    };
    return Joi.validate(user,schema);
};

module.exports = userRoute;